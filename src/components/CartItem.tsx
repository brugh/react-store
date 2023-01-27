import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { currency } from "../utilities/currency";

type CartItemProps = {
  id: number;
  quantity: number;
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find(i => i.id === id);
  if (!item) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={item.imgUrl} style={{ width: "125px", height: "75px", objectFit: "cover" }} />
      <div className="me-auto">
        <div>
          {item.name} {quantity > 0 &&
            <span className="text-muted" style={{ fontSize: ".6rem" }}>x{quantity}</span>
          }
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }} > {currency(item.price)} </div>
      </div>
      <div> {currency(item.price * quantity)} </div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
        &times;
      </Button>
    </Stack>
  )
}