import * as React from "react";
import { useCycle } from "framer-motion";

import { commerce } from "../lib/commerce";

const CartStateContext = React.createContext();
const CartDispatchContext = React.createContext();

const SET_CART = "SET_CART";

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [open, toggle] = useCycle(false, true);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();

      dispatch({ type: SET_CART, payload: cart });
    } catch (err) {
      console.log(err);
    }
  };

  const setCart = async (payload) => dispatch({ type: SET_CART, payload });

  const showCart = () => {
    toggle();
    document.body.classList.add("overflow-hidden");
  };

  const closeCart = () => {
    toggle();
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <CartDispatchContext.Provider value={{ setCart, showCart, closeCart }}>
      <CartStateContext.Provider value={{ open, ...state }}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCartState = () => React.useContext(CartStateContext);
export const useCartDispatch = () => React.useContext(CartDispatchContext);
