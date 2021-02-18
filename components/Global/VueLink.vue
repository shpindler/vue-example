<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VueLink',
  functional: true,
  render(h, { data, children }) {
    const classes = 'vue-link'
    data.staticClass = data.staticClass
      ? `${classes} ${data.staticClass}`
      : classes
    return h('nuxt-link', data, children)
  },
})
</script>

<style lang="scss">
.vue-link {
  text-decoration: none;
  color: map_get($colors, dark-gray);
  font-size: map_get($font-sizes, 2);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
}
</style>
