<script lang="ts">
import Vue from 'vue'
import { BRow } from 'bootstrap-vue'

export default Vue.extend({
  name: 'VueRow',
  functional: true,
  render(h, { data, children }) {
    const classes = 'vue-row'
    data.staticClass = data.staticClass
      ? `${classes} ${data.staticClass}`
      : classes
    return h(BRow, data, children)
  },
})
</script>
