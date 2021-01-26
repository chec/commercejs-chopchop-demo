import ThankYou from "../../svg/thankyou.svg";

function Success({ has }) {
  return (
    <div className="h-full md:flex md:items-center md:space-x-12 lg:space-x-24">
      <div className="md:w-1/2 ">
        <h1 className="font-serif font-medium italic text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
          Thanks!
        </h1>
        <p className="mt-3 text-lg md:text-xl font-sans">
          {has.digital_fulfillment
            ? "You’ll recieve an email with your reciept, and a backup link to redownload your purchase"
            : "You’ll recieve an email with your reciept, and tracking information."}
        </p>
      </div>
      <div className="md:w-1/2 md:flex md:items-center md:justify-center">
        <a
          href="https://commercejs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ThankYou />
        </a>
      </div>
    </div>
  );
}

export default Success;
