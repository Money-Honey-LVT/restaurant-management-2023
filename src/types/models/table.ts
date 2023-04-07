import { BaseModel } from '.';

export interface Table extends BaseModel {
  name: string;
  capacity: number;
  status: TableStatus;
}

export type TableStatus = 0 | 1 | 2;
