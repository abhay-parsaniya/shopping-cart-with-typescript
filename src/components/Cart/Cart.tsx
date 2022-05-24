import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.style";
import { cartItemType } from "../../App";
import React from "react";

type Props = {
  cartItems: cartItemType[];
  addToCart: (clickedItem: cartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {

  const calculateTotal = (items: cartItemType[]) => (
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0)
  )

  return (
    <Wrapper>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>Your Cart is Empty</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total Price: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
