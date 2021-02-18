export enum NotificationTypes {
  NEGATIVE,
  POSITIVE,
  NEUTRAL,
}

export interface RawNotification {
  header: string;
  text: string;
  type: NotificationTypes;
  created: string;
  seen: boolean;
}
