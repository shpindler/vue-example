<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class WindowEvent extends Vue {
  @Prop() readonly event!: string;

  mounted() {
    addEventListener(this.event, this.handler)
  }

  beforeDestroy() {
    removeEventListener(this.event, this.handler)
  }

  handler(e: Event) {
    this.$emit(this.event, e)
  }

  render(): null {
    return null
  }
}
</script>
