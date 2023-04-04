export interface Product {
  name?: string;
  description?: string;
  imgSrc?: string;
  type?: ProductType;
  price?: number;
}

export enum ProductType {
  lau = 'lau',
}
