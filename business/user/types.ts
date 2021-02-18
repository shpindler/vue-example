import { UserProfile } from './models'

export interface UserResponseData {
  user: UserProfile;
}

export interface UpdateUserData extends Partial<Omit<UserProfile, 'avatar'>> {
  avatar?: Blob;
}
