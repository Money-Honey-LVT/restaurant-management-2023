import { BaseModel } from '.';

export interface Product extends BaseModel {
  name?: string;
  description?: string;
  imgSrc?: string;
  type?: ProductType;
  price?: number;
}

export enum ProductType {
  lau = 'lau',
}
