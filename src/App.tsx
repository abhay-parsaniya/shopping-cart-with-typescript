import React, { useState } from "react";
import { useQuery } from "react-query";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import { Wrapper, StyledButton } from "./App.style";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";

export type cartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<cartItemType[]> => {
  let products = await fetch("https://fakestoreapi.com/products");
  return (products = await products.json());
};

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as cartItemType[]);

  const { data, isLoading, error } = useQuery<cartItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: cartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: cartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if(isItemInCart)
      {
        return prev.map(item => (
          item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item
        ))
      }

      return [...prev, {...clickedItem, amount: 1}];
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if(item.id === id)
        {
          if(item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount - 1}];
        }
        else{
          return [...ack, item];
        }
      }, [] as cartItemType[])
    ))
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>There was an error</div>;

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartIsOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}></Item>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
