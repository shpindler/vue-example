import { RawRole } from './types'

export class Role {
  id!: number;
  name!: string;
  userType!: string;

  constructor(role: Role) {
    this.id = role.id
    this.name = role.name
    this.userType = role.userType
  }

  static parse(role: RawRole): Role {
    return new Role({
      id: role.userRoleId,
      name: role.userRoleName,
      userType: role.userType,
    })
  }
}
