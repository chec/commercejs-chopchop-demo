import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { commerce } from "../../lib/commerce";

import { useCheckoutState, useCheckoutDispatch } from "../../context/checkout";

import { FormCheckbox, FormInput, FormError } from "../Form";
import AddressFields from "./AddressFields";

const style = {
  base: {
    "::placeholder": {
      color: "rgba(21,7,3,0.3)",
    },
    color: "#150703",
    fontSize: "16px",
    fontFamily: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    iconColor: "#6B7280",
  },
};

function BillingForm() {
  const [countries, setCountries] = useState();
  const [subdivisions, setSubdivisions] = useState();
  const methods = useFormContext();
  const { collects } = useCheckoutState();
  const { setError } = useCheckoutDispatch();

  const { watch, setValue, clearErrors } = methods;

  const shipping = watch("shipping");
  const watchCountry = watch("billing.country");

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    watchCountry && fetchSubdivisions(watchCountry);
  }, [watchCountry]);

  const fetchCountries = async () => {
    try {
      const { countries } = await commerce.services.localeListCountries();

      setCountries(countries);
    } catch (err) {
      // noop
    }
  };

  const fetchSubdivisions = async (country) => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        country
      );

      setSubdivisions(subdivisions);
    } catch (err) {
      // noop
    }
  };

  const onStripeChange = () => {
    clearErrors("stripe");
    setError(null);
  };

  return (
    <div className="md:flex md:space-x-12 lg:space-x-24">
      <div className="md:w-1/2">
        <fieldset className="mb-3 md:mb-4">
          <legend className="text-black font-medium text-lg md:text-xl py-3 block">
            Billing address
          </legend>

          {collects?.shipping_address && (
            <FormCheckbox
              label="Same as shipping address"
              name="billingIsShipping"
              onChange={({ target: { checked } }) =>
                checked && setValue("billing", shipping)
              }
            />
          )}

          <AddressFields
            prefix="billing"
            countries={countries}
            subdivisions={subdivisions}
          />
        </fieldset>
      </div>

      <div className="md:w-1/2">
        <fieldset>
          <legend className="text-black font-medium text-lg md:text-xl py-3">
            Payment
          </legend>

          <FormInput
            type="email"
            label="Email"
            name="customer.email"
            placeholder="Receipt email"
            required
            validation={{
              pattern: {
                value: /^\S+@\S+$/i,
                message: "You must enter a valid email",
              },
            }}
          />

          <div className="space-y-3">
            <div>
              <CardNumberElement
                options={{ style }}
                className="appearance-none bg-transparent placeholder-faded-black border border-faded-black focus:border-black focus:outline-none rounded-md w-full p-1.5"
                onChange={onStripeChange}
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <CardExpiryElement
                  options={{ style }}
                  placeholder="Expiry"
                  className="appearance-none bg-transparent placeholder-faded-black border border-faded-black focus:border-black focus:outline-none rounded-md w-full p-1.5"
                  onChange={onStripeChange}
                />
              </div>
              <div className="w-1/2">
                <CardCvcElement
                  options={{ style }}
                  className="appearance-none bg-transparent placeholder-faded-black border border-faded-black focus:border-black focus:outline-none rounded-md w-full p-1.5"
                  onChange={onStripeChange}
                />
              </div>
            </div>
          </div>
          <FormError name="stripe" />
        </fieldset>
      </div>
    </div>
  );
}

export default BillingForm;
