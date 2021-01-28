import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import { useCartDispatch } from "../../context/cart";
import { useCheckoutState, useCheckoutDispatch } from "../../context/checkout";

import ExtraFieldsForm from "./ExtraFieldsForm";
import ShippingForm from "./ShippingForm";
import BillingForm from "./BillingForm";
import Success from "./Success";
import CheckoutSummary from "./CheckoutSummary";
import OrderSummary from "./OrderSummary";

import LoadingSVG from "../../svg/loading.svg";

function Checkout({ cartId }) {
  const [order, setOrder] = useState();
  const { reset: resetCart } = useCartDispatch();
  const { currentStep, id, live } = useCheckoutState();
  const {
    generateToken,
    setCurrentStep,
    nextStepFrom,
    capture,
    setProcessing,
    setError: setCheckoutError,
  } = useCheckoutDispatch();
  const methods = useForm({
    shouldUnregister: false,
  });
  const { handleSubmit, setError } = methods;

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    generateToken(cartId);
  }, [cartId]);

  const captureOrder = async (values) => {
    setProcessing(true);

    const {
      customer,
      shipping,
      billing: { firstname, lastname, region: county_state, ...billing },
      ...data
    } = values;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement("cardNumber"),
      billing_details: {
        name: `${billing.firstname} ${billing.lastname}`,
        email: customer.email,
      },
    });

    if (error) {
      setError("stripe", { type: "manual", message: error.message });
      setProcessing(false);
      return;
    }

    const checkoutPayload = {
      ...data,
      customer: {
        ...customer,
        firstname,
        lastname,
      },
      ...(shipping && {
        shipping: {
          ...shipping,
          name: `${shipping.firstname} ${shipping.lastname}`,
        },
      }),
      billing: {
        ...billing,
        name: `${firstname} ${lastname}`,
        county_state,
      },
    };

    try {
      const newOrder = await capture({
        ...checkoutPayload,
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      });

      handleOrderSuccess(newOrder);
      setProcessing(false);
    } catch (res) {
      if (
        res.statusCode !== 402 ||
        res.data.error.type !== "requires_verification"
      ) {
        setCheckoutError(res.data.error.message);
        setProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe.handleCardAction(
        res.data.error.param
      );

      if (error) {
        setError("stripe", { type: "manual", message: error.message });
        setProcessing(false);
        return;
      }

      try {
        const newOrder = await capture({
          ...checkoutPayload,
          payment: {
            gateway: "stripe",
            stripe: {
              payment_intent_id: paymentIntent.id,
            },
          },
        });

        handleOrderSuccess(newOrder);
        setProcessing(false);
      } catch (err) {
        setError("stripe", { type: "manual", message: error.message });
        setProcessing(false);
      }
    }
  };

  const handleOrderSuccess = (order) => {
    setOrder(order);
    setCurrentStep("success");
    resetCart();
  };

  const onSubmit = (values) => {
    if (currentStep === "billing") return captureOrder(values);

    return setCurrentStep(nextStepFrom(currentStep));
  };

  if (!id)
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-6">
        <LoadingSVG className="w-10 md:w-16 fill-current" />
        <p className="text-black">Preparing checkout</p>
      </div>
    );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between pt-6 md:pt-12"
      >
        {currentStep === "extrafields" && <ExtraFieldsForm />}
        {currentStep === "shipping" && <ShippingForm />}
        {currentStep === "billing" && <BillingForm />}
        {currentStep === "success" && <Success {...order} />}

        {order ? <OrderSummary {...order} /> : <CheckoutSummary {...live} />}
      </form>
    </FormProvider>
  );
}

export default Checkout;
