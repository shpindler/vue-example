<template>
  <user-profile
    v-if="profile"
    :profile="profile"
    v-bind="$attrs"
    v-on="$listeners"
  />
  <loading-window-cmp v-else />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import UserProfile from 'Windows/UserProfile.vue'
import LoadingWindowCmp from 'Windows/LoadingCmp.vue'
import { userStore } from '@/store'
import { UserProfile as UserProfileModel } from '@/business/user/models'

@Component({
  components: {
    UserProfile,
    LoadingWindowCmp,
  },
})
export default class PersonalCabinet extends Vue {
  profile: UserProfileModel | null = null

  async created() {
    await userStore.fetchUser()
    this.profile = userStore.user
  }
}
</script>
