/** Переадресует на страницу выбора роли, если она не выбрана. */
import { Middleware } from '@nuxt/types'
import { rolesStore } from '@/store'

const middleware: Middleware = ({ redirect }) => {
  return rolesStore.getCurrentRole()
    .then((role) => {
      if (!role) {
        redirect('/auth/role')
      }
    })
    .catch(() => {
      redirect('/auth/role')
    })
}

export default middleware
