import { User } from './user';

export interface Staff extends User {
  salary?: number;
  imgSrc?: string;
  fullName?: string;
  userName?: string;
  role?: string;
  hiredDate?: string;
}

export enum StaffRole {
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
}
