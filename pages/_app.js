import "react-toastify/dist/ReactToastify.css";

import "../styles/tailwind.css";

import { AnimatePresence } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "../context/theme";
import { CartProvider } from "../context/cart";

import Cart from "../components/Cart";
import Layout from "../components/Layout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const toastOptions = {
  position: "bottom-center",
  draggable: false,
  hideProgressBar: true,
  className: "w-full md:max-w-2xl",
  toastClassName: "bg-ecru-white rounded-lg text-black px-3 shadow-md",
};

function MyApp({ Component, pageProps, router }) {
  return (
    <Elements stripe={stripePromise}>
      <ThemeProvider>
        <CartProvider>
          <Cart />
          <Layout>
            <AnimatePresence initial={false} exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
            <ToastContainer {...toastOptions} />
          </Layout>
        </CartProvider>
      </ThemeProvider>
    </Elements>
  );
}

export default MyApp;
