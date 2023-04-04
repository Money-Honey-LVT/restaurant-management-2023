import { User } from './user';

export interface Staff extends User {
  salary?: number;
  imgSrc?: string;
}
