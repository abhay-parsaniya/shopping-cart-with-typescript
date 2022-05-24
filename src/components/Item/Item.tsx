import Button from "@material-ui/core/Button";
import { cartItemType } from "../../App";
import { Wrapper } from "./Item.style";

type Props = {
    item: cartItemType,
    handleAddToCart: (clickedItem: cartItemType) => void
};

const Item: React.FC<Props> = ({item, handleAddToCart}) => {
    
    return(
    <Wrapper>
        <img src={item.image} alt={item.title}></img>
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>{item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
    )
}

export default Item;