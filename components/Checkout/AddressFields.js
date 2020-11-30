import React from "react";
import { useFormContext } from "react-hook-form";

import { FormCheckbox, FormInput, FormSelect } from "../Form";

function AddressFields({
  legend,
  countries = {},
  subdivisions = {},
  override = false,
}) {
  const requiresInput = !!override;
  const { watch } = useFormContext();

  const reducer = ([code, name]) => ({
    value: code,
    label: name,
  });

  const formattedCountries = subdivisions
    ? Object.entries(countries).map(reducer)
    : [];

  const formattedSubdivisions = subdivisions
    ? Object.entries(subdivisions).map(reducer)
    : [];

  const watchOverride = watch("address.override", requiresInput);

  return (
    <fieldset className="mb-3 md:mb-4">
      {legend && (
        <legend className="text-black font-medium text-lg md:text-xl py-3 block">
          {legend}
        </legend>
      )}

      {override && <FormCheckbox name="address.override" label={override} />}

      {!watchOverride && (
        <React.Fragment>
          <FormInput
            label="Name"
            name="address.name"
            placeholder="Full name"
            required
          />
          <FormInput
            label="Address"
            name="address.street"
            placeholder="Address"
            required
          />
          <FormInput
            label="Town / City"
            name="address.town_city"
            placeholder="City"
            required
          />

          <div className="md:flex md:items-start md:space-x-4">
            <div className="md:w-1/3">
              <FormSelect
                label="Country"
                name="address.country"
                options={formattedCountries}
                required
              />
            </div>
            <div className="md:w-1/3">
              <FormSelect
                label="County / State"
                name="address.region"
                options={formattedSubdivisions}
                required
              />
            </div>
            <div className="md:w-1/3">
              <FormInput
                name="address.postal_zip_code"
                placeholder="ZIP"
                required
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </fieldset>
  );
}

export default AddressFields;
