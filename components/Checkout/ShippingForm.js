import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { commerce } from "../../lib/commerce";

import { useCheckoutState, useCheckoutDispatch } from "../../context/checkout";

import AddressFields from "./AddressFields";
import { FormSelect } from "../Form";

function ShippingForm() {
  const { id } = useCheckoutState();
  const { setShippingMethod } = useCheckoutDispatch();
  const [countries, setCountries] = useState();
  const [subdivisions, setSubdivisions] = useState();
  const [shippingOptions, setShippingOptions] = useState([]);
  const methods = useFormContext();
  const { watch, setValue } = methods;

  const watchCountry = watch("shipping.country");
  const watchSubdivision = watch("shipping.region");
  const watchShippingMethod = watch("fulfillment.shipping_method");

  useEffect(() => {
    fetchCountries(id);
  }, []);

  useEffect(() => {
    setValue("shipping.region", "");

    if (watchCountry) {
      fetchSubdivisions(id, watchCountry);
      fetchShippingOptions(id, watchCountry);
    }
  }, [watchCountry]);

  useEffect(() => {
    if (watchSubdivision) {
      fetchShippingOptions(id, watchCountry, watchSubdivision);
    }
  }, [watchSubdivision]);

  useEffect(() => {
    watchShippingMethod && selectShippingMethod(watchShippingMethod);
  }, [watchShippingMethod]);

  const fetchCountries = async (checkoutId) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutId
      );

      setCountries(countries);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubdivisions = async (checkoutId, countryCode) => {
    try {
      const {
        subdivisions,
      } = await commerce.services.localeListShippingSubdivisions(
        checkoutId,
        countryCode
      );

      setSubdivisions(subdivisions);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchShippingOptions = async (checkoutId, country, region) => {
    if (!checkoutId && !country) return;

    try {
      const shippingOptions = await commerce.checkout.getShippingOptions(
        checkoutId,
        {
          country,
          ...(region && { region }),
        }
      );

      setShippingOptions(shippingOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const selectShippingMethod = async (optionId) => {
    try {
      await setShippingMethod(optionId, watchCountry, watchSubdivision);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:flex md:space-x-12 lg:space-x-24">
      <div className="md:w-1/2">
        <fieldset className="mb-3 md:mb-4">
          <legend className="text-black font-medium text-lg md:text-xl py-3 block">
            Shipping address
          </legend>

          <AddressFields
            prefix="shipping"
            countries={countries}
            subdivisions={subdivisions}
          />
        </fieldset>
      </div>
      <div className="md:w-1/2">
        <fieldset className="mb-3 md:mb-4">
          <legend className="text-black font-medium text-lg md:text-xl py-3 block">
            Shipping
          </legend>
          <div>
            {watchCountry ? (
              <FormSelect
                label="Choose a shipping method"
                name="fulfillment.shipping_method"
                options={shippingOptions.map(({ id, description, price }) => ({
                  value: id,
                  label: `${description}: ${price.formatted_with_symbol}`,
                }))}
                placeholder="Select shipping method"
                required="You must select a shipping method."
              />
            ) : (
              <p className="text-sm text-black">
                Please enter your address to fetch shipping options
              </p>
            )}
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default ShippingForm;
