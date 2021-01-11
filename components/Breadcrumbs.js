import { useCheckoutState } from "../context/checkout";

// TODO: Build array of crumbs dynamically from available steps

function Breadcrumbs({ inCart }) {
  const { currentStep, extrafields } = useCheckoutState();

  if (inCart) {
    return <span className="text-lg md:text-xl">Shopping Bag</span>;
  }

  if (currentStep === "success") {
    return <span className="text-lg md:text-xl">Order received</span>;
  }

  return (
    <div className="space-x-3">
      {currentStep === "extrafields" && (
        <>
          <span className="text-lg md:text-xl">Shopping Bag</span>
          <span className="text-lg md:text-xl">&rarr;</span>
          <span className="text-lg md:text-xl">Booking</span>
          <span className="text-lg md:text-xl opacity-50">&rarr;</span>
          <span className="text-lg md:text-xl opacity-50">Shipping</span>
          <span className="text-lg md:text-xl opacity-50">&rarr;</span>
          <span className="text-lg md:text-xl opacity-50">Payment</span>
        </>
      )}
      {currentStep === "shipping" && (
        <>
          <span className="text-lg md:text-xl">Shopping Bag</span>

          {extrafields.length > 0 && (
            <>
              <span className="text-lg md:text-xl">&rarr;</span>
              <span className="text-lg md:text-xl">Booking</span>
            </>
          )}
          <span className="text-lg md:text-xl">&rarr;</span>
          <span className="text-lg md:text-xl">Shipping</span>
          <span className="text-lg md:text-xl opacity-50">&rarr;</span>
          <span className="text-lg md:text-xl opacity-50">Payment</span>
        </>
      )}
      {currentStep === "billing" && (
        <>
          <span className="text-lg md:text-xl">Shopping Bag</span>
          {extrafields.length > 0 && (
            <>
              <span className="text-lg md:text-xl">&rarr;</span>
              <span className="text-lg md:text-xl">Booking</span>
            </>
          )}
          <span className="text-lg md:text-xl">&rarr;</span>
          <span className="text-lg md:text-xl">Shipping</span>
          <span className="text-lg md:text-xl">&rarr;</span>
          <span className="text-lg md:text-xl">Payment</span>
        </>
      )}
    </div>
  );
}

export default Breadcrumbs;
