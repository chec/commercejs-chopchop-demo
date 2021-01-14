import { useFormContext } from "react-hook-form";

function FormCheckbox({
  label,
  children,
  name,
  required = false,
  validation = {},

  ...props
}) {
  const { register } = useFormContext();

  const isRequired = required
    ? typeof required === "boolean"
      ? `${label || name} is required`
      : required
    : false;

  return (
    <div className="py-1 md:py-2">
      <label
        htmlFor={props.id || name}
        className="flex items-center cursor-pointer w-full"
      >
        <input
          ref={register({ required: isRequired, ...validation })}
          id={props.id || name}
          name={name}
          type="checkbox"
          className="appearance-none bg-transparent checked:bg-black border border-faded-black checked:border-black hover:border-black focus:border-black focus:checked:outline-none focus:outline-none text-black rounded w-5 h-5 cursor-pointer"
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
