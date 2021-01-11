import { AnimatePresence, motion } from "framer-motion";

import { useModalState, useModalDispatch } from "../context/modal";
import { useCartState } from "../context/cart";

import Cart from "./Cart";
import Checkout from "./Checkout";

function CurrentStep({ step }) {
  const { id } = useCartState();

  switch (step) {
    case "cart":
      return <Cart />;
    case "checkout":
      return <Checkout cartId={id} />;
    default:
      return null;
  }
}

function Modal() {
  const { open, step } = useModalState();
  const { closeModal } = useModalDispatch();

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
                  className="appearance-none leading-none text-black p-1 -mr-1 focus:outline-none"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
            <CurrentStep step={step} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
