import { useFormContext } from "react-hook-form";
import cc from "classcat";

import Chevron from "../../svg/chevron.svg";

function FormSelect({
  label,
  name,
  options,
  required = false,
  validation = {},
  ...props
}) {
  const { errors, register } = useFormContext();

  const isRequired = required ? `${label || name} is required` : false;
  const isError = errors[name];

  const wrapperClass = cc([
    "relative overflow-hidden border focus:border-black focus:outline-none rounded-md w-full",
    { "border-faded-black": !isError, "border-red-500": isError },
  ]);

  return (
    <div className="py-1 md:py-2">
      <div className={wrapperClass}>
        <select
          ref={register({ required: isRequired, ...validation })}
          id={name}
          name={name}
          className="appearance-none w-full py-1 pr-6 pl-1.5 text-base placeholder-faded-black focus:outline-none"
          {...props}
        >
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

      {isError && (
        <div className="py-2">
          <FormError children={isError?.message} />
        </div>
      )}
    </div>
  );
}

export default FormSelect;
