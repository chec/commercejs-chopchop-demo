import { useFormContext } from "react-hook-form";
import cc from "classcat";

function FormCheckbox({
  label,
  children,
  name,
  required = false,
  validation = {},
  ...props
}) {
  const { errors, register } = useFormContext();

  const isRequired = required ? `${label || name} is required` : false;
  const isError = errors[name];

  const inputClass = cc([
    "appearance-none bg-transparent border focus:border-black text-black rounded w-5 h-5",
    {
      "border-faded-black": !isError,
      "border-red-500": isError,
    },
  ]);

  return (
    <div className="py-1 md:py-2">
      <label htmlFor={name} className="flex items-center cursor-pointer w-full">
        <input
          ref={register({ required: isRequired, ...validation })}
          id={name}
          name={name}
          type="checkbox"
          className={inputClass}
          {...props}
        />

        {(children || label) && (
          <span className="ml-2">{children || label}</span>
        )}
      </label>
    </div>
  );
}

export default FormCheckbox;
