<template>
  <error-page>
    <template #image>
      <vue-img
        src="~assets/img/pic__500.svg"
        height="177"
      />
    </template>
    <template #code>
      500
    </template>
    <template #description>
      Профилактические работы на сервере
    </template>
  </error-page>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ErrorPage from 'ErrorPage.vue'

@Component({
  components: {
    ErrorPage,
  },
})
export default class InternalServerErrorPage extends Vue {}
</script>
