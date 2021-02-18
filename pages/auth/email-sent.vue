<template>
  <div>
    <div class="mb-4">
      На указанный адрес отправлено письмо с дальнейшими инструкциями.
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
export default class EmailSentPage extends Vue {
  layout() {
    return 'auth'
  }

  head() {
    return {
      title: 'Восстановление забытого пароля',
    }
  }
}
</script>
