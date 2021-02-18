<template functional>
  <section class="window-controls">
    <button
      v-if="props.minimize"
      class="window-control window-control_minimize"
      @click="listeners.minimize"
    />
    <button
      v-if="props.restore"
      class="window-control window-control_restore"
      @click="listeners.restore"
    >
      <vue-icon :size="14">
        filter_none
      </vue-icon>
    </button>
    <button
      v-if="props.maximize"
      class="window-control window-control_maximize"
      @click="listeners.maximize"
    >
      <vue-icon :size="18">
        check_box_outline_blank
      </vue-icon>
    </button>
    <button
      v-if="props.close"
      class="window-control window-control_close"
      @click="listeners.close"
    >
      <vue-icon :size="20">
        close
      </vue-icon>
    </button>
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { WindowControls } from '~/types/windows'

type Props = {
  [K in keyof WindowControls]: PropOptions<WindowControls[K]>;
}

export default Vue.extend({
  name: 'WindowControls',
  functional: true,
  props: {
    minimize: {
      type: Boolean,
      default: true,
    },
    restore: {
      type: Boolean,
      default: true,
    },
    maximize: {
      type: Boolean,
      default: true,
    },
    close: {
      type: Boolean,
      default: true,
    },
  } as Props,
})
</script>

<style lang="scss" scoped>
.window-control {
  position: absolute;
  top: 5px;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background-color: transparent;
  color: map_get($colors, dark-gray);
  cursor: pointer;
  opacity: 0.5;
  transition: 0.2s;

  /** Сброс дефолтных стилей. */
  overflow: unset;
  margin: 0;
  float: unset;

  &:hover {
    opacity: 1;
  }

  &_close {
    right: 5px;
  }

  &_maximize {
    top: 6px;
    right: 25px;
  }

  &_restore {
    top: 6px;
    right: 25px;
  }

  &_minimize {
    top: 1px;
    right: 50px;
    width: 15px;
    border-bottom: 2px solid map_get($colors, dark-gray);
  }
}
</style>
