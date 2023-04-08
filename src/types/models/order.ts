import { BaseModel } from '.';
import { Table } from './table';

export interface Order extends BaseModel {
  customerId: number;
  staffId: number;
  status: OrderStatus;
  isVoucher: boolean;
  orderTables: Table[];
}

export enum OrderStatus {
  pending = 'pending',
  fulfilled = 'fulfilled',
}
