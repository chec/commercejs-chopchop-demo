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

  const isRequired = required ? `${label || name} is required` : false;

  return (
    <div className="py-1 md:py-2">
      <label htmlFor={name} className="flex items-center cursor-pointer w-full">
        <input
          ref={register({ required: isRequired, ...validation })}
          id={name}
          name={name}
          type="checkbox"
          className="appearance-none bg-transparent checked:bg-black border border-faded-black checked:border-black hover:border-black focus:border-black focus:checked:outline-none focus:outline-none text-black rounded w-5 h-5"
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
