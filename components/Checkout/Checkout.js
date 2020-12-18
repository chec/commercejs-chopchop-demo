import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

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
  const { currentStep, id, live, collects } = useCheckoutState();
  const { generateToken, setCurrentStep, capture } = useCheckoutDispatch();
  const methods = useForm({ shouldUnregister: false });
  const { handleSubmit } = methods;

  useEffect(() => {
    generateToken(cartId);
  }, [cartId]);

  const nextStepFrom = ({ currentStep, collects }) => {
    switch (currentStep) {
      case "extrafields":
        return collects.shipping_address ? "shipping" : "billing";
      case "shipping":
      default:
        return "billing";
    }
  };

  const captureOrder = async (values) => {
    const {
      customer,
      shipping,
      billing: { firstname, lastname, region: county_state, ...billing },
      ...data
    } = values;

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
          gateway: "test_gateway",
          card: {
            number: "4242424242424242",
            expiry_month: "12",
            expiry_year: "22",
            cvc: "123",
            postal_zip_code: "NE42 5NY",
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

    return setCurrentStep(nextStepFrom({ currentStep, collects }));
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
