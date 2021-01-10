import { useCartState } from "../context/cart";
import { useModalDispatch } from "../context/modal";

function CartSummary() {
  const { total_unique_items } = useCartState();
  const { openModal } = useModalDispatch();

  return (
    <button className="appearance-none focus:outline-none" onClick={openModal}>
      Shopping Bag ({total_unique_items})
    </button>
  );
}

export default CartSummary;
