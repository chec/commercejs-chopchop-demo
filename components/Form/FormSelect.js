import { useFormContext } from "react-hook-form";

import Chevron from "../../svg/chevron.svg";

import FormError from "./FormError";

function FormSelect({
  label,
  name,
  options,
  required = false,
  validation = {},
  placeholder,
  ...props
}) {
  const { register } = useFormContext();

  const isRequired = required ? `${label || name} is required` : false;

  return (
    <div className="py-2">
      <div className="relative overflow-hidden border border-faded-black focus:border-black focus:outline-none rounded-md w-full">
        <select
          ref={register({ required: isRequired, ...validation })}
          id={name}
          name={name}
          className="appearance-none bg-transparent w-full py-1 pr-6 pl-1.5 text-base placeholder-faded-black focus:outline-none"
          defaultValue=""
          {...props}
        >
          <option disabled value="">
            {placeholder || `Select a ${label}`}
          </option>

          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label || value}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
          <Chevron />
        </div>
      </div>

      <FormError name={name} />
    </div>
  );
}

export default FormSelect;
