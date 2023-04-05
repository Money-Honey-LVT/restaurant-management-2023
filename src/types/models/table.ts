import { BaseModel } from '.';

export interface Table extends BaseModel {
  name?: string;
  capacity?: number;
  status?: TableStatus;
}

export enum TableStatus {
  opened = 'opened',
  booked = 'booked',
}
