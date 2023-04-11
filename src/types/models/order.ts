import { BaseModel } from '.';
import { Table } from './table';
import { Voucher } from './voucher';

export interface Order extends BaseModel {
  customerId: number;
  customerName: string;
  staffId: number;
  staffName: string;
  status: OrderStatus;
  isVoucher: boolean;
  vouchers: Voucher[];
  orderTables: Table[];
}

export enum OrderStatus {
  pending = 'PENDING',
  fulfilled = 'FULFILLED',
  cancelled = 'CANCELLED',
}
