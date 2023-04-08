import React from 'react';
import { useCartContext } from '../../hooks/use-cart-context';

const Checkout = () => {
  const { state } = useCartContext();

  const { items } = state;
  console.log(items);

  return <div>{items[0]?.name ?? null}</div>;
};

export default Checkout;
