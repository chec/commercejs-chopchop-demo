import React from "react";

import Chevron from "../svg/chevron.svg";

function VariantPicker({ variantGroups = [], defaultValues = {}, ...props }) {
  if (!variantGroups || variantGroups.length === 0) return null;

  return (
    <div className="space-x-2 md:flex">
      {variantGroups.map(({ options, ...group }) => (
        <div
          key={group.id}
          className="rounded border border-black relative w-32 overflow-hidden"
        >
          <label htmlFor={group.id} className="sr-only">
            {group.name}:
          </label>

          <select
            id={group.id}
            defaultValue={defaultValues[group.id]}
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
