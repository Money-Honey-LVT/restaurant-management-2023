import { CartItem } from '.';

export enum CartAction {
  ADD_CART_ITEM = 'ADD_CART_ITEM',
  DELETE_CART_ITEM = 'DELETE_CART_ITEM',
  DELETE_MULTIPLE_CART_ITEMS = 'DELETE_MULTIPLE_CART_ITEMS',
}

interface AddCartItem {
  type: CartAction.ADD_CART_ITEM;
  payload: CartItem;
}

interface DeleteCartItem {
  type: CartAction.DELETE_CART_ITEM;
  payload: CartItem;
}

interface DeleteMultipleCartItem {
  type: CartAction.DELETE_MULTIPLE_CART_ITEMS;
  payload: CartItem;
}

export type CartActionType = AddCartItem | DeleteCartItem | DeleteMultipleCartItem;
