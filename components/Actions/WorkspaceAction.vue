<template>
  <article class="workspace-item py-5">
    <vue-link
      :to="url"
      class="workspace-item__title"
      @click.native="openWindow"
    >
      {{ action.name }}
    </vue-link>
    <vue-link
      :to="url"
      class="workspace-item__icon mb-3"
      @click.native="openWindow"
    >
      <vue-img
        :src="iconSrc"
        class="workspace-item__image"
        contain
      />
    </vue-link>
  </article>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ActionMixin from './action'

@Component
export default class WorkspaceAction extends mixins(ActionMixin) {
  get iconSrc(): string {
    return `/static/nuxt-static/workspace-icons/icon__workspace--${this.action.icon}.svg`
  }
}
</script>

<style lang="scss" scoped>
.workspace-item {
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
}

.workspace-item__icon {
  display: block;
  width: 128px;
  height: 128px;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: 0 8px 12px 0 #ececec;
  background-color: map_get($colors, white);
}

.workspace-item__title {
  font-size: 14px;
  line-height: 1.71;
  text-transform: uppercase;
  color: map_get($colors, darkest);
}
</style>

<style lang="scss">
.workspace-item__image {
  transition: 0.2s;
}

.workspace-item__icon:hover .workspace-item__image,
.workspace-item__title:hover + .workspace-item__icon > .workspace-item__image {
  filter: saturate(2.5);
}
</style>
