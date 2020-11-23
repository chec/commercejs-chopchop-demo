import * as React from "react";

import { commerce } from "../lib/commerce";

const CartStateContext = React.createContext();
const CartDispatchContext = React.createContext();

const SET_CART = "SET_CART";
const SHOW_CART = "SHOW_CART";
const HIDE_CART = "HIDE_CART";

const initialState = {
  open: false,
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload };
    case SHOW_CART:
      return { ...state, open: true };
    case HIDE_CART:
      return { ...state, open: false };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
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
    dispatch({ type: SHOW_CART });
    document.body.classList.add("overflow-hidden");
  };

  const hideCart = () => {
    dispatch({ type: HIDE_CART });
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <CartDispatchContext.Provider value={{ setCart, showCart, hideCart }}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCartState = () => React.useContext(CartStateContext);
export const useCartDispatch = () => React.useContext(CartDispatchContext);
