import Vue from 'vue'

Vue.filter('nowrap', (value: string) => {
  if (!value) {
    return ''
  }
  return value.replace(/\s/g, '&nbsp;')
})
