import React, { createContext, useReducer } from 'react';
import { CartAction, CartActionType } from './action';
import { Order } from '../../types/models/order';
import { Food } from '../../types/models/food';

export type CartItem = Food & { quantity: number };

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

  return { state, addCartItem };
}

export const CartContext = createContext<ReturnType<typeof useCartReducer>>({
  state: initialState,
  addCartItem: () => {},
});

interface Props {
  children: React.ReactNode | string;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const cartReducer = useCartReducer();

  return <CartContext.Provider value={cartReducer}>{children}</CartContext.Provider>;
};
