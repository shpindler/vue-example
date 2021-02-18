import { RowsData } from '../types'

export interface SetRoleData {
  roleId: number;
  userType: string;
}

export interface RawRole {
  id: number;
  userRoleId: number;
  userType: string;
  userRoleName: string;
}

export type RolesRowsData = RowsData<RawRole>
