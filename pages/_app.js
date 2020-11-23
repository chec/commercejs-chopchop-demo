import "../styles/tailwind.css";

import { AnimatePresence } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { ThemeProvider } from "../context/theme";
import { CartProvider } from "../context/cart";

import Cart from "../components/Cart";
import Layout from "../components/Layout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

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
          </Layout>
        </CartProvider>
      </ThemeProvider>
    </Elements>
  );
}

export default MyApp;
