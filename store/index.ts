import { ActionTree, Store, MutationTree } from 'vuex'
import { initialiseStores } from '@/utils/store-accessor'

export const state = () => ({
  // Введено как общее свойство для страниц, использующих auth layout.
  loading: false,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_LOADING(state, payload: boolean): void {
    state.loading = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  reset({ commit }): void {
    commit('user/RESET')
    commit('roles/RESET')
  },
}

const initializer = (store: Store<any>) => initialiseStores(store)

export const plugins = [initializer]
export * from '@/utils/store-accessor'
