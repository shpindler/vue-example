<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VueCalendar',
  functional: true,
  render(h, { data, children }) {
    data.props = {
      locale: 'ru',
      ...data.props,
    }
    return h('v-calendar', data, children)
  },
})
</script>

<style lang="scss" scoped></style>
