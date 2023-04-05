import { BaseModel } from '.';

export interface Order extends BaseModel {
  customerId?: number;
  staffId?: number;
  status?: OrderStatus;
  isVoucher?: boolean;
}

export enum OrderStatus {
  pending = 'pending',
  fulfilled = 'fulfilled',
}
