<template functional>
  <vue-footer
    class="site-footer pr-3 py-0 bg-white"
    min-height="40"
    app
  >
    <vue-row
      align-v="center"
      align-h="between"
      no-gutters
    >
      <slot />
      <vue-col
        cols="auto"
        class="ml-auto pt-1"
      >
        <vue-img
          src="~assets/img/logo__rzd.svg"
          max-width="60"
          height="30"
          alt="РЖД"
          contain
        />
      </vue-col>
    </vue-row>
  </vue-footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SiteFooter',
  functional: true,
})
</script>
