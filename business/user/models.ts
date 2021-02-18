export class User {
  firstName = ''
  lastName = ''
  avatar = ''
  position = ''

  constructor({
    firstName = '',
    lastName = '',
    avatar = '',
    position = '',
  }: Partial<User>) {
    this.firstName = firstName
    this.lastName = lastName
    this.avatar = avatar
    this.position = position
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}

export class UserProfile extends User {
  patronymic = ''
  email = ''
  ucpk = ''
  phone = ''
  _dateOfBirth = ''
  position = ''
  isNewUser = false

  constructor(user: Partial<UserProfile>) {
    super(user)
    this.patronymic = user.patronymic || ''
    this.email = user.email || ''
    this.ucpk = user.ucpk || ''
    this.phone = user.phone || ''
    this._dateOfBirth = user.dateOfBirth as unknown as string || ''
    this.position = user.position || ''
    this.isNewUser = user.isNewUser || false
  }

  get dateOfBirth(): Date | undefined {
    if (!this._dateOfBirth) {
      return undefined
    }
    const [year, month, day] = this._dateOfBirth.split('-').map(p => parseInt(p))
    return new Date(year, month - 1, day)
  }
}
