import React from "react";

import { commerce } from "../lib/commerce";

const CheckoutStateContext = React.createContext();
const CheckoutDispatchContext = React.createContext();

const SET_CHECKOUT = "SET_CHECKOUT";
const SET_LIVE = "SET_LIVE";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CHECKOUT:
      return action.payload;
    case SET_LIVE:
      return { ...state, live: { ...state.live, ...action.payload } };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const initialState = {
  shipping_methods: [],
};

export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const generateToken = async (cartId) => {
    if (!cartId) return;

    try {
      const payload = await commerce.checkout.generateToken(cartId, {
        type: "cart",
      });

      dispatch({ type: SET_CHECKOUT, payload });
    } catch (err) {
      console.log(err);
    }
  };

  const setShippingMethod = async (shipping_option_id, country, region) => {
    try {
      const { live } = await commerce.checkout.checkShippingOption(state.id, {
        shipping_option_id,
        country,
        ...(region && { region }),
      });

      dispatch({ type: SET_LIVE, payload: live });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CheckoutDispatchContext.Provider
      value={{
        generateToken,
        setShippingMethod,
      }}
    >
      <CheckoutStateContext.Provider value={state}>
        {children}
      </CheckoutStateContext.Provider>
    </CheckoutDispatchContext.Provider>
  );
};

export const useCheckoutState = () => React.useContext(CheckoutStateContext);
export const useCheckoutDispatch = () =>
  React.useContext(CheckoutDispatchContext);
