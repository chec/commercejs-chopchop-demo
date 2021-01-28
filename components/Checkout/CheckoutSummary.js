import cc from "classcat";

import { useCheckoutState } from "../../context/checkout";

import Button from "../Button";

function CheckoutSummary({ subtotal, tax, shipping, line_items = [], total }) {
  const { processing, error } = useCheckoutState();
  const count = line_items.length;

  return (
    <div className="py-6">
      <div className="md:flex md:justify-between md:space-x-6">
        <div className="w-full md:w-1/2">
          <ol>
            {subtotal && <li>Subtotal: {subtotal.formatted_with_symbol}</li>}
            {tax && <li>Tax: {tax.amount.formatted_with_symbol}</li>}
            {shipping && (
              <li>Shipping: {shipping.price.formatted_with_symbol}</li>
            )}
            {total && (
              <li className="text-lg md:text-xl py-3">
                Total: {total.formatted_with_symbol}, {count}{" "}
                {count === 1 ? "item" : "items"}
              </li>
            )}
          </ol>
        </div>
        <div className="w-full md:w-1/2 md:flex md:items-end md:justify-end">
          <div className="flex items-center space-x-3">
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <Button
              type="submit"
              className={cc([
                "appearance-none leading-none p-1 md:p-2 lg:p-3 text-lg md:text-xl",
                {
                  "opacity-75 cursor-not-allowed": processing,
                },
              ])}
              disabled={processing}
            >
              {processing ? "Processing order" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummary;
