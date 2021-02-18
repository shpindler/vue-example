export interface RawAction {
  url?: string;
  text: string;
  icon?: string;
  items?: RawAction[];
  context?: { [key: string]: any };
  extra?: { [key: string]: any };
}

export interface GetActionsResponseData {
  desktop: string;
}
