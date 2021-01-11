import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { commerce } from "../../lib/commerce";

import { FormCheckbox, FormInput, FormError } from "../Form";
import AddressFields from "./AddressFields";

function BillingForm() {
  const [countries, setCountries] = useState();
  const [subdivisions, setSubdivisions] = useState();
  const methods = useFormContext();
  const { watch, setValue } = methods;

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
      console.log(err);
    }
  };

  const fetchSubdivisions = async (country) => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        country
      );

      setSubdivisions(subdivisions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:flex md:space-x-12 lg:space-x-24">
      <div className="md:w-1/2">
        <fieldset className="mb-3 md:mb-4">
          <legend className="text-black font-medium text-lg md:text-xl py-3 block">
            Billing address
          </legend>

          <FormCheckbox
            label="Same as shipping address"
            name="billingIsShipping"
            onChange={({ target: { checked } }) =>
              checked && setValue("billing", shipping)
            }
          />

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
              <CardNumberElement className="appearance-none bg-transparent placeholder-faded-black border border-faded-black focus:border-black focus:outline-none rounded-md w-full text-base px-1.5 py-1" />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <CardExpiryElement
                  placeholder="Expiry"
                  className="appearance-none bg-transparent placeholder-faded-black border border-faded-black focus:border-black focus:outline-none rounded-md w-full text-base px-1.5 py-1"
                  // onChange={handleCardExpiryChange}
                  // onReady={(el) => setValue("cardExpiryElement", el)}
                />
              </div>
              <div className="w-1/2">
                <CardCvcElement
                  className="appearance-none bg-transparent placeholder-faded-black border border-faded-black focus:border-black focus:outline-none rounded-md w-full text-base px-1.5 py-1"
                  // onChange={handleCardCvcChange}
                  // onReady={(el) => setValue("cardCvcElement", el)}
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
