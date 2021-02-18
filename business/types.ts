import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface ServerResponse<T> {
  data: T;
  [key: string]: any;
}

export type AxiosResponse<T> = Promise<ServerResponse<T>>

export interface RowsData<T> {
  rows: T[];
}

export interface ApiContext {
  $axios: NuxtAxiosInstance;
  [key: string]: any;
}
