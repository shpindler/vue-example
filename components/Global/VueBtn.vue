<script lang="ts">
import Vue, { PropOptions } from 'vue'
import VueLink from 'Global/VueLink.vue'
import VueSpinner from 'Global/VueSpinner.vue'

export default Vue.extend({
  name: 'VueBtn',
  functional: true,
  props: {
    to: {
      type: [Object, String],
      default: '',
    } as PropOptions<object | string>,
    href: {
      type: String,
      default: '',
    } as PropOptions<string>,
    loading: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
    variant: {
      type: String,
      default: 'neutral',
    } as PropOptions<string>,
  },
  render(h, { props, data, children }) {
    const isLink = Boolean(props.to || props.href)
    const classes: string =
      `vue-btn vue-btn_variant_${props.variant} ` +
      `vue-btn_loading_${props.loading}`
    data.staticClass = data.staticClass
      ? `${classes} ${data.staticClass}`
      : classes
    if (!data.attrs) {
      data.attrs = {}
    }
    data.attrs.disabled = data.attrs.disabled || props.loading
    return h(
      isLink ? VueLink : 'button',
      { ...data, props: { ...data.props, ...props } },
      props.loading ? [h(VueSpinner)] : children,
    )
  },
})
</script>

<style lang="scss">
.vue-btn {
  position: relative;
  padding: 5px 14px;
  border: none;
  border-radius: 4px;
  text-transform: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);

  font-size: 14px;
  line-height: 1.57;

  transition: 0.2s;
  cursor: pointer;

  &:active:not(:disabled) {
    box-shadow: inset 0 1px 3px 0 #1a1f27;
  }

  &:disabled {
    opacity: 0.8;
    cursor: default;
  }

  &_variant {
    &_primary {
      background-color: var(--primary);
      color: map_get($colors, white);

      &:hover:not(:disabled) {
        filter: brightness(1.1);
      }
    }

    &_neutral {
      border: solid 1px var(--neutral);
      background-color: map_get($colors, white);

      &:hover:not(:disabled) {
        border-color: var(--primary);
        background-color: var(--primary);
        color: map_get($colors, white);
      }
    }
  }

  &_loading {
    &_true {
      font-size: 0;
    }
  }
}

.vue-btn_variant_primary > .vue-spinner {
  border-left-color: var(--neutral);
  border-top-color: var(--neutral);
  border-bottom-color: var(--neutral);
}
</style>
