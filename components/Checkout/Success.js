import ThankYou from "../../svg/thankyou.svg";

function Success({ order }) {
  return (
    <div className="h-full md:flex md:space-x-12 lg:space-x-24">
      <div className="md:w-1/2">
        <h1 className="font-serif font-medium italic text-2xl md:text-4xl lg:text-5xl">
          Thanks!
        </h1>
        <p className="text-lg md:text-xl font-sans">
          Thank you for your order.
        </p>
      </div>
      <div className="md:w-1/2 md:flex md:items-center md:justify-center">
        <ThankYou />
      </div>
    </div>
  );
}

export default Success;
