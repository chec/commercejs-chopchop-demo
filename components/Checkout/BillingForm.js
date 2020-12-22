import React from "react";
import { useFormContext } from "react-hook-form";

import { commerce } from "../../lib/commerce";

import { FormInput } from "../Form";
import AddressFields from "./AddressFields";

function BillingForm() {
  const [countries, setCountries] = React.useState();
  const [subdivisions, setSubdivisions] = React.useState();
  const methods = useFormContext();
  const { watch } = methods;

  const watchCountry = watch("billing.country");

  React.useEffect(() => {
    fetchCountries();
  }, []);

  React.useEffect(() => {
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
            Billing
          </legend>

          <AddressFields
            prefix="billing"
            legend="Billing Address"
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
          {/* <div>
            <CardNumberElement
              onChange={handleCardNumberChange}
              onReady={(el) => setValue("cardNumberElement", el)}
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <CardExpiryElement
                placeholder="Expiry"
                onChange={handleCardExpiryChange}
                onReady={(el) => setValue("cardExpiryElement", el)}
              />
            </div>
            <div className="w-1/2">
              <CardCvcElement
                onChange={handleCardCvcChange}
                onReady={(el) => setValue("cardCvcElement", el)}
              />
            </div>
          </div> */}
          {/* <FormError name="stripe" /> */}
        </fieldset>
      </div>
    </div>
  );
}

export default BillingForm;
