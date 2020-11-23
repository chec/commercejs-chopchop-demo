import { AnimatePresence, motion } from "framer-motion";

import { useCartState, useCartDispatch } from "../context/cart";

import Button from "./Button";
import CartItem from "./CartItem";

export default function Cart() {
  const { open, line_items, subtotal, total_unique_items } = useCartState();
  const { closeCart } = useCartDispatch();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="bg-ecru-white z-50 fixed overflow-scroll inset-0"
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{ opacity: 0, y: -50 }}
        >
          <div className="h-full container mx-auto px-3 md:px-4 lg:px-5 flex flex-col justify-between">
            <div>
              <div className="py-3 md:py-4 lg:py-5 flex items-center justify-between">
                <span className="text-lg md:text-xl">Shopping Bag</span>
                <button
                  className="appearance-none leading-none text-black p-1 -mr-1"
                  onClick={closeCart}
                >
                  Close
                </button>
              </div>
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
                <Button className="appearance-none leading-none p-1 md:p-1.5 lg:px-3.5 text-lg md:text-xl">
                  Check Out
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
