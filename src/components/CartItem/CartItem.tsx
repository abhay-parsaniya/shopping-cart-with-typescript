import Button from "@material-ui/core/Button";
import { isTemplateMiddle } from "typescript";
import { cartItemType } from "../../App";
import Item from "../Item/Item";
import { Wrapper } from "./CartItem.style";

type Props = {
  item: cartItemType;
  addToCart: (clickedItem: cartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
        //   disabledElevation
          variant="contained"
          onClick={() => removeFromCart(item.id)}
        >
          {" "}
          -{" "}
        </Button>
        <Button
          size="small"
        //   disabledElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          {" "}
          +{" "}
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>
);

export default CartItem;
