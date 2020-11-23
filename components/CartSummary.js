import { useCartState, useCartDispatch } from "../context/cart";

function CartSummary() {
  const { total_unique_items } = useCartState();
  const { showCart } = useCartDispatch();

  return (
    <button className="appearance-none" onClick={showCart}>
      Shopping Bag ({total_unique_items || 0})
    </button>
  );
}

export default CartSummary;
