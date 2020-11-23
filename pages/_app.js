import "../styles/tailwind.css";

import { AnimatePresence } from "framer-motion";

import { ThemeProvider } from "../context/theme";
import { CartProvider } from "../context/cart";

import Cart from "../components/Cart";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps, router }) {
  return (
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
  );
}

export default MyApp;
