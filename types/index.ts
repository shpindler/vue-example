import { Notification } from '@/business/notifications/models'
import { Action } from '@/business/actions/models'

export type SubmenuItem = Action | Notification

export interface FormErrors {
  all?: string[];
}

export type Coord = number | string | null

export interface Coords<T> {
  top: T;
  left: T;
  bottom: T;
  right: T;
}

export type MouseCoords = Coords<number>
export type ElementCoords = Coords<Coord>

export interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}
