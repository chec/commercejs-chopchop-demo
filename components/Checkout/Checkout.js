import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useStripe, useElements } from "@stripe/react-stripe-js";

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
  const { currentStep, id, live } = useCheckoutState();
  const {
    generateToken,
    setCurrentStep,
    nextStepFrom,
    capture,
  } = useCheckoutDispatch();
  const methods = useForm({ shouldUnregister: false });
  const { handleSubmit } = methods;

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    generateToken(cartId);
  }, [cartId]);

  const captureOrder = async (values) => {
    const {
      customer,
      shipping,
      billing: { firstname, lastname, region: county_state, ...billing },
      ...data
    } = values;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement("cardNumber"),
    });

    try {
      const newOrder = await capture({
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
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      });

      setOrder(newOrder);
      setCurrentStep("success");
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (values) => {
    if (currentStep === "billing") return captureOrder(values);

    return setCurrentStep(nextStepFrom(currentStep));
  };

  if (!id)
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-black">
          <LoadingSVG className="w-10 h-10" />
        </p>
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
        {currentStep === "success" && <Success order={order} />}

        {order ? <OrderSummary {...order} /> : <CheckoutSummary {...live} />}
      </form>
    </FormProvider>
  );
}

export default Checkout;
