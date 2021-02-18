<template>
  <div>
    <div class="mb-4">
      Новый пароль установлен!
    </div>
    <div class="text-right">
      <vue-btn
        :to="{ name: 'auth' }"
        variant="primary"
      >
        ОК
      </vue-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PasswordResetComplete extends Vue {
  layout() {
    return 'auth'
  }
}
</script>
