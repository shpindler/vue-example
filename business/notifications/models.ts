import { Color } from '../models'
import { NotificationTypes, RawNotification } from './types'

export abstract class Notification {
  abstract readonly type: NotificationTypes
  abstract readonly image: string
  abstract readonly color: Color
  readonly title: string
  readonly text: string
  readonly date: Date
  seen: boolean

  constructor(data: Pick<Notification, 'title' | 'text' | 'date' | 'seen'>) {
    this.title = data.title
    this.text = data.text
    this.date = data.date
    this.seen = data.seen
  }
}

export class NegativeNotification extends Notification {
  type = NotificationTypes.NEGATIVE
  image = 'error'
  color = new Color(255, 192, 33)
}

export class PositiveNotification extends Notification {
  type = NotificationTypes.POSITIVE
  image = 'check_circle'
  color = new Color(71, 215, 100)
}

export class NeutralNotification extends Notification {
  type = NotificationTypes.NEUTRAL
  image = 'info'
  color = new Color(47, 134, 235)
}

export function parseNotification(data: RawNotification): Notification {
  const preparedData = {
    title: data.header,
    text: data.text,
    date: new Date(data.created),
    seen: data.seen,
  }
  switch (data.type) {
    case NotificationTypes.NEGATIVE:
      return new NegativeNotification(preparedData)
    case NotificationTypes.POSITIVE:
      return new PositiveNotification(preparedData)
    case NotificationTypes.NEUTRAL:
      return new NeutralNotification(preparedData)
  }
}
