import {
  NegativeNotification,
  PositiveNotification,
  NeutralNotification,
  Notification,
  parseNotification,
} from '../models'
import { NotificationTypes } from '../types'

function checkParsing(
  type: NotificationTypes,
  model: typeof Notification,
): void {
  const data = {
    type,
    header: 'Test',
    text: 'Тест',
    created: '2000-10-10',
    seen: false,
  }
  const notification = parseNotification(data)
  expect(notification).toBeInstanceOf(model)
  expect(notification.type).toBe(data.type)
  expect(notification.text).toBe(data.text)
  expect(notification.date).toEqual(new Date(data.created))
  expect(notification.seen).toBe(data.seen)
}

describe('parseNotification', () => {
  test(`возвращает NegativeNotification при type = ${NotificationTypes.NEGATIVE}.`, () => {
    checkParsing(NotificationTypes.NEGATIVE, NegativeNotification)
  })

  test(`возвращает PositiveNotification при type = ${NotificationTypes.POSITIVE}.`, () => {
    checkParsing(NotificationTypes.POSITIVE, PositiveNotification)
  })

  test(`возвращает NeutralNotification при type = ${NotificationTypes.NEUTRAL}.`, () => {
    checkParsing(NotificationTypes.NEUTRAL, NeutralNotification)
  })
})
