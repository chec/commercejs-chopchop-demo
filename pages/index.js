import Head from 'next/head';
import { motion } from "framer-motion";

import { commerce } from "../lib/commerce";

import Header from "../components/Header";
import ProductList from "../components/ProductList";
import ProductGrid from "../components/ProductGrid";

export async function getStaticProps() {
  const { data } = await commerce.products.list();

  const products = data.filter(({ active }) => active);

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}

function IndexPage({ products }) {
  return (
    <>
      <Head>
        <title>ChopChop</title>
      </Head>
      <div className="md:min-h-screen md:flex md:items-center">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-10">
          <div className="md:max-h-screen md:w-1/2 flex items-end justify-between md:sticky md:top-0">
            <Header />

            <motion.div
              className="md:py-12 hidden md:block md:sticky md:top-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.25,
                },
              }}
              exit={{ opacity: 0, y: -50 }}
            >
              <h1 className="font-serif italic text-xl md:text-3xl">Shop:</h1>

              <div className="pt-3">
                <ProductList products={products} />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="md:min-h-screen py-6 md:py-12 flex items-center md:w-1/2 md:z-40"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <ProductGrid products={products} className="h-112 md:h-96 xl:h-112" />
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default IndexPage;
