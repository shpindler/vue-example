<template>
  <error-page>
    <template #image>
      <vue-img
        src="~assets/img/pic__404.svg"
        height="205"
      />
    </template>
    <template #code>
      404
    </template>
    <template #description>
      Страница не найдена
    </template>
    <vue-btn
      class="mt-5"
      @click="$router.go(-1)"
    >
      Назад
    </vue-btn>
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
export default class NotFoundPage extends Vue {}
</script>
