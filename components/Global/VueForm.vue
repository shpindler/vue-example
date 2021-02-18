<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VueForm',
  functional: true,
  render(h, { data, children }) {
    data.attrs = {
      ...data.attrs,
      novalidate: 'novalidate',
    }
    return h('form', data, children)
  },
})
</script>
