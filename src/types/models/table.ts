import { BaseModel } from '.';

export interface Table extends BaseModel {
  name?: string;
  capacity?: number;
  status?: 0 | 1 | 2;
}
