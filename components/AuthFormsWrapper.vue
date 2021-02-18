<template functional>
  <vue-row
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    class="fill-height"
    align-v="center"
    align-h="center"
    no-gutters
    v-on="listeners"
  >
    <vue-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <vue-card
        :loading="parent.$store.state.loading"
        tag="article"
        class="login-form-wrapper bg-white"
      >
        <header class="login-form-wrapper__header pa-4">
          <vue-card-title class="login-form-wrapper__title bold">
            АСУ УЦПК
          </vue-card-title>
        </header>
        <vue-card-text class="pa-4">
          <slot />
        </vue-card-text>
      </vue-card>
    </vue-col>
  </vue-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AuthFormsWrapper',
  functional: true,
})
</script>

<style lang="scss">
.login-form-wrapper {
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(120, 141, 158, 0.2);
  overflow: hidden;
}

.login-form-wrapper__header {
  display: flex;
  align-items: center;
  background-color: map_get($colors, light-gray);
}

.login-form-wrapper__title {
  margin: 0;
  font-size: map_get($font-sizes, 1);
  letter-spacing: 0.8px;

  &::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 37px;
    margin-right: 10px;
    background-image: url("~assets/img/logo__asu.svg");
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.login-form-wrapper__body {
  padding: 30px;
  background-color: map_get($colors, white);
}
</style>
