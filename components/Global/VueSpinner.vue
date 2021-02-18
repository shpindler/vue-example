<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'VueSpinner',
  functional: true,
  props: {
    variant: {
      type: String,
      default: 'neutral',
    } as PropOptions<string>,
    size: {
      type: [Number, String],
      default: '',
    } as PropOptions<number | string>,
  },
  render(h, { props, data, children }) {
    const classes = `vue-spinner vue-spinner_variant_${props.variant}`
    data.staticClass = data.staticClass
      ? `${classes} ${data.staticClass}`
      : classes
    data.attrs = data.attrs || {}
    data.attrs.style = data.attrs.style || ''
    if (props.size) {
      data.attrs.style =
        `${data.attrs.style}; width: ${props.size}px; height: ${props.size}px;`
    }
    return h('div', data, children)
  },
})
</script>

<style lang="scss" scoped>
@keyframes spinner-border {
  to {
    transform: rotate(1turn);
  }
}

.vue-spinner {
  box-sizing: border-box;
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: text-bottom;
  border: 3px solid;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;

  &_variant {
    @each $key, $value in map_get($theme, colors) {
      &_#{$key} {
        border-left-color: #{$value};
        border-top-color: #{$value};
        border-bottom-color: #{$value};
      }
    }
  }

  border-right: 3px solid transparent;
}
</style>
