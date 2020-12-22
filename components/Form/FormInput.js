import { useFormContext } from "react-hook-form";

import FormError from "./FormError";

function FormInput({
  label,
  name,
  type = "text",
  required = false,
  validation = {},
  ...props
}) {
  const { register } = useFormContext();

  const isRequired = required ? `${label || name} is required` : false;

  return (
    <div className="py-2">
      <input
        ref={register({ required: isRequired, ...validation })}
        id={name}
        name={name}
        type={type}
        className="appearance-none bg-transparent placeholder-faded-black border border-faded-black focus:border-black focus:outline-none rounded-md w-full text-base px-1.5 py-1"
        {...props}
      />
      <FormError name={name} />
    </div>
  );
}

export default FormInput;
