import cc from "classcat";

function FormError({ className, ...props }) {
  return (
    <span className={cc(["text-red-500 text-sm", className])} {...props} />
  );
}

export default FormError;
