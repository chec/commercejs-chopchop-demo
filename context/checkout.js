import { createContext, useReducer, useContext } from "react";

import { commerce } from "../lib/commerce";

const CheckoutStateContext = createContext();
const CheckoutDispatchContext = createContext();

const SET_CURRENT_STEP = "SET_CURRENT_STEP";
const SET_CHECKOUT = "SET_CHECKOUT";
const SET_LIVE = "SET_LIVE";
const SET_PROCESSING = "SET_PROCESSING";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    case SET_CHECKOUT:
      return {
        ...state,
        ...action.payload,
      };
    case SET_LIVE:
      return { ...state, live: { ...state.live, ...action.payload } };
    case SET_PROCESSING:
      return { ...state, processing: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const initialState = {
  currentStep: "extrafields",
  processing: false,
};

export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const setCurrentStep = (step) =>
    dispatch({ type: SET_CURRENT_STEP, payload: step });

  const nextStepFrom = (currentStep) => {
    switch (currentStep) {
      case "extrafields":
        return state.collects.shipping_address ? "shipping" : "billing";
      case "shipping":
      default:
        return "billing";
    }
  };

  const capture = (values) => commerce.checkout.capture(state.id, values);

  const setProcessing = (payload) =>
    dispatch({ type: SET_PROCESSING, payload });

  return (
    <CheckoutDispatchContext.Provider
      value={{
        generateToken,
        setShippingMethod,
        setCurrentStep,
        nextStepFrom,
        capture,
        setProcessing,
      }}
    >
      <CheckoutStateContext.Provider value={state}>
        {children}
      </CheckoutStateContext.Provider>
    </CheckoutDispatchContext.Provider>
  );
};

export const useCheckoutState = () => useContext(CheckoutStateContext);
export const useCheckoutDispatch = () => useContext(CheckoutDispatchContext);
