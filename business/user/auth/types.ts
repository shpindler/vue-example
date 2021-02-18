import { UserResponseData } from '@/business/user/types'

export interface LoginResponseData extends UserResponseData {
  message?: string;
  uidb64?: string;
  token?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface PasswordResetLinkData {
  email: string;
}

export interface PasswordResetData {
  newPassword1: string;
  newPassword2: string;
}
