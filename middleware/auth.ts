/** Переадресует на страницу авторизации, если пользователь неавторизован. */
import { Middleware } from '@nuxt/types'
import { userStore } from '@/store'

const middleware: Middleware = ({ redirect }) => {
  return userStore.fetchUser()
    .then(() => undefined)
    .catch(() => {
      redirect('/auth')
    })
}

export default middleware
