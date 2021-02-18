<script>
// https://markus.oberlehner.net/blog/

export default {
  name: 'VueCollapseTransition',
  functional: true,
  render(h, context) {
    const data = {
      props: {
        name: 'expand',
      },
      on: {
        afterEnter(element) {
          element.style.height = 'auto'
        },
        enter(element) {
          element.style.width = getComputedStyle(element).width
          element.style.position = 'absolute'
          element.style.visibility = 'hidden'
          element.style.height = 'auto'

          const height = getComputedStyle(element).height

          element.style.width = null
          element.style.position = null
          element.style.visibility = null
          element.style.height = 0

          // Force repaint to make sure the
          // animation is triggered correctly.
          // eslint-disable-next-line no-unused-expressions
          getComputedStyle(element).height

          setTimeout(() => {
            element.style.height = height
          })
        },
        leave(element) {
          element.style.height = getComputedStyle(element).height
          // Force repaint to make sure the
          // animation is triggered correctly.
          // eslint-disable-next-line no-unused-expressions
          getComputedStyle(element).height

          setTimeout(() => {
            element.style.height = 0
          })
        },
      },
    }
    return h('transition', data, context.children)
  },
}
</script>

<style lang="scss" scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
