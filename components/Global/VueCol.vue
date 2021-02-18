<script lang="ts">
import Vue from 'vue'
import { BCol } from 'bootstrap-vue'

export default Vue.extend({
  name: 'VueCol',
  functional: true,
  render(h, { data, children }) {
    const classes = 'vue-col'
    data.staticClass = data.staticClass
      ? `${classes} ${data.staticClass}`
      : classes
    return h(BCol, data, children)
  },
})
</script>
