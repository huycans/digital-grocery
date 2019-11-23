import React from "react";
import { CartItem } from './CartItem'
export default function CartList({ value, viewMode, order }) {
  const { cart, orderHistory } = value;
  let display;
  if (viewMode == true) {
    return order.items.map(item => {
      return <CartItem viewMode={viewMode} key={item.id} item={item} value={value} />;
    })
  }
  else display = cart.map(item => {
    console.log("item", item);
    return <CartItem key={item.id} item={item} value={value} />;
  });
  console.log(cart);


  return (
    <div className="container-fluid">
      {display}
    </div>
  );
}
