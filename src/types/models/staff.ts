import { User } from './user';

export interface Staff extends User {
  salary: number;
  image: string;
  fullname: string;
  username: string;
  role: string;
  hiredDate: string;
  password?: string;
}

export enum StaffRole {
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
}
