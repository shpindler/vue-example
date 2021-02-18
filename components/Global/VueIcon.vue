<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'VueIcon',
  functional: true,
  props: {
    size: {
      type: [String, Number],
      default: '',
    } as PropOptions<string | number>,
    color: {
      type: String,
      default: '',
    } as PropOptions<string>,
  },
  render(h, { props, data, children }) {
    const classes = 'vue-icon material-icons'
    data.staticClass = data.staticClass
      ? `${data.staticClass} ${classes}`
      : classes
    data.style = data.style || {}
    if (props.size) {
      Object.assign(data.style, { fontSize: `${props.size}px` })
    }
    if (props.color) {
      Object.assign(data.style, { color: props.color })
    }
    return h('i', data, children)
  },
})
</script>
