<template functional>
  <article
    :class="[$style.user, data.class, data.staticClass, {
      [$style.user_opened]: props.opened,
    }]"
    class="d-flex align-items-center py-3 border-bottom border-dark"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <avatar :avatar="props.user.avatar" :class="$style.user__avatar" />
    <section :class="$style.user__text">
      <section
        class="text-white font-size-2 bold mb-1"
        :inner-html.prop="props.user.fullName | nowrap"
      />
      <section
        class="text-dark-gray font-size-1"
        :inner-html.prop="props.role.name | nowrap"
      />
    </section>
  </article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Role } from '@/business/roles/models'
import { User } from '@/business/user/models'

export default Vue.extend({
  name: 'User',
  functional: true,
  props: {
    user: {
      type: User,
      required: true,
    } as PropOptions<User>,
    role: {
      type: Role,
      required: true,
    } as PropOptions<Role>,
    opened: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
  },
})
</script>

<style lang="scss" module>
.user {
  padding-left: 21px;
}

.user__text {
  opacity: 0;
}

.user_opened .user__text {
  position: static;
  opacity: 1;
}

.user_opened .user__avatar {
  margin-right: map_get($offsets, 4);
}
</style>
