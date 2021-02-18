<template>
  <article
    :class="[$style.workspace__toolbar, {
      [$style.workspace__toolbar_noSubmenu]: hasNoSubmenuClass,
    }]"
    :style="{
      transition: `all ${growToolbarAnimationDuration}ms ease`,
      zIndex,
    }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <section
      :class="$style.workspace__toolbarItems"
      :style="{ zIndex: zIndex + 1 }"
    >
      <user
        :opened="isToolbarOpened"
        :user="user"
        :role="role"
        class="clickable"
        @click="openPersonalCabinet"
      />
      <notifications-toolbar-item
        :active="activeItem === 0"
        :count="unseenNotifications.length"
        :opened="isToolbarOpened"
        data-testid="notifications-item"
        @click.native="showNotifications"
      />
      <action
        v-for="(action, i) in actions"
        :key="`action-${i}`"
        :active="activeItem === i + 1"
        :opened="isToolbarOpened"
        :action="action"
        @click.native="onActionClick(action, i + 1)"
      />
      <workspace-toolbar-item
        :opened="isToolbarOpened"
        class="mt-auto"
        icon="exit_to_app"
        title="Выход"
        @click="confirmLogout"
      />
    </section>
    <transition name="slide-x">
      <submenu
        v-if="hasSubmenu"
        :items="submenuItems"
        :title="submenuTitle"
        :style="{ zIndex }"
        data-testid="submenu"
        @close="closeSubmenu"
      >
        <template v-if="activeItem === 0" #item="{ item, index }">
          <notification
            :key="`notification-${index}-${item.text}`"
            :class="{ 'mb-2': index < submenuItems.length - 1 }"
            :notification="item"
            data-testid="submenu-notification"
          />
        </template>
      </submenu>
    </transition>
    <window-event
      event="click"
      @click="closeSubmenuIfOutside"
    />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Action,
  Component,
  Inject,
  Prop,
  Watch,
} from 'nuxt-property-decorator'
import Notification from 'Notifications/Item.vue'
import NotificationsToolbarItem from 'Notifications/ToolbarItem.vue'
import User from 'User.vue'
import WorkspaceToolbarAction from 'Actions/WorkspaceToolbarAction.vue'
import WorkspaceToolbarItem from 'WorkspaceToolbarItem.vue'
import { SubmenuItem } from '@/types'
import { WindowsManager } from '@/types/windows'
import { Action as ActionModel } from '@/business/actions/models'
import { Role } from '@/business/roles/models'
import { User as UserModel } from '@/business/user/models'
import { Notification as NotificationModel, PositiveNotification, NeutralNotification, NegativeNotification } from '@/business/notifications/models'
import { notificationsStore, rolesStore, userStore } from '@/utils/store-accessor'

@Component({
  components: {
    Notification,
    NotificationsToolbarItem,
    User,
    Action: WorkspaceToolbarAction,
    WorkspaceToolbarItem,
    Submenu: () => import('WorkspaceToolbarSubmenu.vue'),
  },
})
export default class WorkspaceToolbar extends Vue {
  @Inject() readonly windows!: WindowsManager

  @Prop({ default: () => [] }) readonly actions!: ActionModel[]
  @Prop({ default: true }) readonly expandable!: boolean
  @Prop({ type: Number, default: 1 }) readonly zIndex!: number

  hasSubmenu = false
  hasNoSubmenuClass = true
  hovered = false
  submenuTitle = ''
  submenuItems: SubmenuItem[] = []
  growToolbarAnimationDuration = 600
  activeItem = -1
  timer: ReturnType<typeof setTimeout> | null = null

  get role(): Role {
    return rolesStore.role as Required<Role>
  }

  get user(): UserModel {
    return userStore.user as Required<UserModel>
  }

  get notifications(): NotificationModel[] {
    return notificationsStore.notifications
  }

  get unseenNotifications(): NotificationModel[] {
    return notificationsStore.unseenNotifications
  }

  get roleName(): string {
    return this.role ? this.role.name : ''
  }

  get isToolbarOpened(): boolean {
    return this.hasNoSubmenuClass && this.hovered
  }

  @Watch('hasSubmenu')
  onHasSubmenuChanged(newValue: boolean): void {
    if (newValue) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.hasNoSubmenuClass = false
    } else if (!this.expandable) {
      this.timer = setTimeout(() => {
        this.hasNoSubmenuClass = true
      }, this.growToolbarAnimationDuration)
    }
  }

  @Watch('expandable')
  onExpandableChanged(newValue: boolean): void {
    if (newValue) {
      this.hasNoSubmenuClass = false
    } else {
      this.hasNoSubmenuClass = !this.hasSubmenu
    }
  }

  @Action('notifications/markAsSeen') readonly markAsSeen!: Function

  openSubmenu(items: SubmenuItem[], title: string): void {
    this.hasSubmenu = true
    this.submenuTitle = title
    this.submenuItems = items
  }

  closeSubmenu(): void {
    if (this.activeItem === 0) {
      this.markAsSeen()
    }
    this.hasSubmenu = false
    this.activeItem = -1
  }

  closeSubmenuIfOutside(e: MouseEvent): void {
    if (!e.composedPath().includes(this.$el)) {
      this.closeSubmenu()
    }
  }

  onActionClick({ actions, name }: ActionModel, actionIndex: number): void {
    if (actions && actions.length) {
      this.openSubmenu(actions, name)
      this.activeItem = actionIndex
    }
  }

  confirmLogout(): void {
    this.windows.open({
      component: import('Windows/LogoutWarning.vue'),
    })
  }

  openPersonalCabinet(): void {
    this.windows.open({
      component: import('Windows/PersonalCabinet.vue'),
    })
  }

  showNotifications(): void {
    this.openSubmenu(this.notifications, 'Уведомления')
    this.activeItem = 0
  }
}
</script>

<style lang="scss" module>
.workspace__toolbar {
  position: fixed;
  top: 0;
  left: 0;
  height: calc(100vh - var(--footerHeight));
  max-width: var(--toolbarWidth);
}

.workspace__toolbarItems {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--secondary);
  overflow: hidden;
}

.workspace__toolbar_noSubmenu:hover {
  max-width: 300px;
}

.workspace__toolbar:not(.workspace__toolbar_noSubmenu)
  .workspace__toolbarItems,
.workspace__toolbar:hover .workspace__toolbarItems {
  overflow-y: auto;
}
</style>
