import { Plugin } from '@nuxt/types'
import { camelCase, snakeCase } from 'lodash'
import { getCookie, transformKeys } from '@/utils'

const plugin: Plugin = ({ $axios }) => {
  const csrftoken = getCookie('csrftoken')

  if (csrftoken) {
    $axios.defaults.headers['x-csrftoken'] = csrftoken
  }

  $axios.onRequest((config) => {
    /** Перед запросом на сервер привести все ключи к snakeCase стилю. */
    transformKeys(snakeCase, config.data)
    return config
  })

  $axios.onResponse((response) => {
    /** Ключи данных с сервера привести к camelCase стилю. */
    transformKeys(camelCase, response.data)
    return response
  })
}

export default plugin
