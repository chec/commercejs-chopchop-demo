import { useCartState } from "../context/cart";
import { useModalDispatch } from "../context/modal";

import Button from "./Button";
import CartItem from "./CartItem";

export default function Cart() {
  const { line_items, subtotal, total_unique_items } = useCartState();
  const { showCheckout } = useModalDispatch();

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        {line_items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <div className="flex items-center justify-between py-3 md:py-4 lg:py-5">
        <div className="text-lg md:text-xl">
          Total: {subtotal?.formatted_with_symbol}, {total_unique_items}{" "}
          {total_unique_items === 1 ? "item" : "items"}
        </div>
        <div>
          <Button
            className="appearance-none leading-none p-1 md:p-1.5 lg:px-3.5 text-lg md:text-xl"
            onClick={showCheckout}
          >
            Check Out
          </Button>
        </div>
      </div>
    </div>
  );
}
