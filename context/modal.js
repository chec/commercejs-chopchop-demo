import { createContext, useReducer, useContext } from "react";
import { useCycle } from "framer-motion";

const ModalStateContext = createContext();
const ModalDispatchContext = createContext();

const SHOW_CART = "SHOW_CART";
const SHOW_CHECKOUT = "SHOW_CHECKOUT";

const initialState = {
  step: "cart",
};

const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_CART:
      return { ...state, step: "cart" };
    case SHOW_CHECKOUT:
      return { ...state, step: "checkout" };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const ModalProvider = ({ children }) => {
  const [open, toggle] = useCycle(false, true);
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = () => {
    toggle();
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    toggle(0);
    document.body.classList.remove("overflow-hidden");
    dispatch({ type: "SHOW_CART" });
  };

  const showCart = () => dispatch({ type: "SHOW_CART" });

  const showCheckout = () => dispatch({ type: "SHOW_CHECKOUT" });

  return (
    <ModalDispatchContext.Provider
      value={{ openModal, closeModal, showCart, showCheckout }}
    >
      <ModalStateContext.Provider value={{ open, ...state }}>
        {children}
      </ModalStateContext.Provider>
    </ModalDispatchContext.Provider>
  );
};

export const useModalState = () => useContext(ModalStateContext);
export const useModalDispatch = () => useContext(ModalDispatchContext);
