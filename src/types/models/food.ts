import { BaseModel } from '.';

export interface Food extends BaseModel {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  type?: FoodType;
  isBuffet?: boolean;
}

export enum FoodType {
  hotpot = 'hot-pot',
}
