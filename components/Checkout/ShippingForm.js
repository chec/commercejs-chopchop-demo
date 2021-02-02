import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { commerce } from "../../lib/commerce";

import { useCheckoutState, useCheckoutDispatch } from "../../context/checkout";

import AddressFields from "./AddressFields";
import { FormCheckbox as FormRadio, FormError } from "../Form";

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

  const fetchCountries = async (checkoutId) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutId
      );

      setCountries(countries);
    } catch (err) {
      // noop
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
      // noop
    }
  };

  const fetchShippingOptions = async (checkoutId, country, region) => {
    if (!checkoutId && !country) return;

    setValue("fulfillment.shipping_method", null);

    try {
      const shippingOptions = await commerce.checkout.getShippingOptions(
        checkoutId,
        {
          country,
          ...(region && { region }),
        }
      );

      setShippingOptions(shippingOptions);

      if (shippingOptions.length === 1) {
        const [shippingOption] = shippingOptions;

        setValue("fulfillment.shipping_method", shippingOption.id);
        selectShippingMethod(shippingOption.id);
      }
    } catch (err) {
      // noop
    }
  };

  const onShippingSelect = ({ target: { value } }) =>
    selectShippingMethod(value);

  const selectShippingMethod = async (optionId) => {
    try {
      await setShippingMethod(optionId, watchCountry, watchSubdivision);
    } catch (err) {
      // noop
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
              <>
                <div className="-space-y-1">
                  {shippingOptions.map(({ id, description, price }) => (
                    <FormRadio
                      id={id}
                      type="radio"
                      name="fulfillment.shipping_method"
                      value={id}
                      label={`${description}: ${price.formatted_with_symbol}`}
                      onChange={onShippingSelect}
                      required="You must select a shipping option"
                    />
                  ))}
                </div>

                <FormError name="fulfillment.shipping_method" />
              </>
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
