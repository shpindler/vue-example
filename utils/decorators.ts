import { createDecorator } from 'vue-class-component'

export const NoCache = createDecorator((options, key) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  options.computed[key].cache = false
})
