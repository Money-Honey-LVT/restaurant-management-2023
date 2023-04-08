import React, { createContext, useReducer } from 'react';
import { Food } from '../../types/models/food';
import { CartAction, CartActionType } from './action';

export type CartItem = Partial<Food> & { quantity: number };

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

function CartReducer(state = initialState, action: CartActionType): CartState {
  switch (action.type) {
    case CartAction.ADD_CART_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case CartAction.DELETE_CART_ITEM:
      return {
        ...state,
      };
    case CartAction.DELETE_MULTIPLE_CART_ITEMS:
      return {
        ...state,
      };
    default:
      return state;
  }
}

function useCartReducer(_state = initialState) {
  const [state, dispatch] = useReducer(CartReducer, _state);

  const addCartItem = (payload: CartItem) => {
    dispatch({
      type: CartAction.ADD_CART_ITEM,
      payload,
    });
  };

  const deleteCartItem = () => {};

  const deleteMultipleCartItems = () => {};

  return { state, addCartItem, deleteCartItem, deleteMultipleCartItems };
}

export const CartContext = createContext<ReturnType<typeof useCartReducer>>({
  state: initialState,
  addCartItem: () => {},
  deleteCartItem: () => {},
  deleteMultipleCartItems: () => {},
});

interface Props {
  children: React.ReactNode | string;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const cartReducer = useCartReducer();

  return <CartContext.Provider value={cartReducer}>{children}</CartContext.Provider>;
};
