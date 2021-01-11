import React from "react";

import { FormInput, FormSelect } from "../Form";

function AddressFields({ prefix = "", countries = {}, subdivisions = {} }) {
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

  return (
    <React.Fragment>
      <div className="md:flex md:items-start md:space-x-4">
        <div className="md:w-1/2">
          <FormInput
            label="First name"
            name={`${prefix}.firstname`}
            placeholder="First name"
            required
          />
        </div>
        <div className="md:w-1/2">
          <FormInput
            label="Last name"
            name={`${prefix}.lastname`}
            placeholder="Last name"
            required
          />
        </div>
      </div>

      <FormInput
        label="Address"
        name={`${prefix}.street`}
        placeholder="Address"
        required
      />
      <FormInput
        label="Town / City"
        name={`${prefix}.town_city`}
        placeholder="City"
        required
      />

      <div className="md:flex md:items-start md:space-x-4">
        <div className="md:w-1/3">
          <FormSelect
            label="Country"
            name={`${prefix}.country`}
            options={formattedCountries}
            placeholder="Select country"
            required
            disabled={formattedCountries.length === 0}
          />
        </div>
        <div className="md:w-1/3">
          <FormSelect
            label="County / State"
            name={`${prefix}.region`}
            options={formattedSubdivisions}
            placeholder="Select region"
            required
            disabled={formattedSubdivisions.length === 0}
          />
        </div>
        <div className="md:w-1/3">
          <FormInput
            label="ZIP / Postcode"
            name={`${prefix}.postal_zip_code`}
            placeholder="ZIP"
            required
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddressFields;
