import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action } from '@/business/actions/models'

@Component
export default class ActionMixin extends Vue {
  @Prop({ type: Action, required: true }) readonly action!: Action
  @Prop({ default: '#' }) readonly url!: string

  openWindow(): Promise<void> {
    if (!this.action.url) {
      return Promise.resolve()
    }

    this.$emit('window-opened')

    return this.$axios.get(this.action.url, {
      transformResponse: (d: string) => d,
      params: this.action.params,
    })
      .then(({ data }) => data)
      .then(window.smart_eval)
  }
}
