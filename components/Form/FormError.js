import cc from "classcat";
import { ErrorMessage } from "@hookform/error-message";

function FormError({ className, ...props }) {
  return (
    <div className="pt-1">
      <ErrorMessage
        {...props}
        render={({ message }) => (
          <span className={cc(["text-red-500 text-sm", className])} {...props}>
            {message}
          </span>
        )}
      />
    </div>
  );
}

export default FormError;
