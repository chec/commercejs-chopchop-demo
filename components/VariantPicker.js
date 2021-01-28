import React from "react";

import Chevron from "../svg/chevron.svg";

function VariantPicker({ variants = [], defaultValues = {}, ...props }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-x-2 md:flex">
      {variants.map(({ options, ...variant }) => (
        <div
          key={variant.id}
          className="rounded border border-black relative w-32 overflow-hidden"
        >
          <label htmlFor={variant.id} className="sr-only">
            {variant.name}:
          </label>

          <select
            id={variant.id}
            defaultValue={defaultValues[variant.id]}
            className="appearance-none leading-none block w-full py-1 pr-6 pl-2"
            {...props}
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
            <Chevron />
          </div>
        </div>
      ))}
    </div>
  );
}

export default VariantPicker;
