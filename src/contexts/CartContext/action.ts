import { CartItem } from '.';

export enum CartAction {
  ADD_CART_ITEM = 'ADD_CART_ITEM',
}

interface AddCartItem {
  type: CartAction.ADD_CART_ITEM;
  payload: CartItem;
}

export type CartActionType = AddCartItem;
