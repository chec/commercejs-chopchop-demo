import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

import { AnimatePresence } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

import { ThemeProvider } from "../context/theme";
import { ModalProvider } from "../context/modal";
import { CartProvider } from "../context/cart";
import { CheckoutProvider } from "../context/checkout";

import Layout from "../components/Layout";
import Modal from "../components/Modal";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const toastOptions = {
  position: "bottom-center",
  draggable: false,
  hideProgressBar: true,
  className: "w-full md:max-w-xl",
  toastClassName: "bg-ecru-white rounded-lg text-black px-3 shadow-md",
};

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="description" content="Fine tools for thoughtful cooks"></meta>
      </Head>
      <Elements
        stripe={stripePromise}
        options={{
          fonts: [
            {
              cssSrc:
                "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap",
            },
          ],
        }}
      >
        <ThemeProvider>
          <ModalProvider>
            <CartProvider>
              <CheckoutProvider>
                <Modal />
                <Layout>
                  <AnimatePresence initial={false} exitBeforeEnter>
                    <Component {...pageProps} key={router.route} />
                  </AnimatePresence>
                  <ToastContainer {...toastOptions} />
                </Layout>
              </CheckoutProvider>
            </CartProvider>
          </ModalProvider>
        </ThemeProvider>
      </Elements>
    </>
  );
}

export default MyApp;
