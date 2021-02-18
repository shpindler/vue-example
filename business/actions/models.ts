import { RawAction } from './types'

export class Action {
  url?: string;
  name: string;
  icon?: string;
  actions?: Action[];
  params?: { [key: string]: any };

  constructor(data: Action) {
    this.url = data.url
    this.name = data.name
    this.icon = data.icon
    this.actions = data.actions
    this.params = data.params
  }

  static parse(data: RawAction): Action {
    return new Action({
      name: data.text,
      icon: data.icon,
      url: data.url,
      actions: data.items ? data.items.map(Action.parse) : [],
      params: data.context,
    })
  }
}
