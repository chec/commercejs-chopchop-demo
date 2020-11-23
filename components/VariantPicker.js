import * as React from "react";

function VariantPicker({ variants = [], ...props }) {
  if (!variants || variants.length === 0) return null;

  return (
    <React.Fragment>
      {variants.map(({ options, ...variant }) => (
        <div key={variant.id} className="rounded border border-black px-1">
          <label className="sr-only" htmlFor={variant.id}>
            {variant.name}
          </label>

          <select id={variant.id} {...props} className="appearance-none">
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </React.Fragment>
  );
}

export default VariantPicker;
