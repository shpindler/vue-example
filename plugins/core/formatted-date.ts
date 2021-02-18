import Vue from 'vue'
import { formatDate } from '@/utils'

Vue.filter('date', (value: Date) => {
  if (!value) {
    return ''
  }
  const today = new Date()
  if (
    value.getFullYear() === today.getFullYear() &&
    value.getMonth() === today.getMonth() &&
    value.getDate() === today.getDate()
  ) {
    return 'сегодня'
  }
  return formatDate(value)
})
