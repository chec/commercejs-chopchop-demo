import * as React from "react";
import Head from "next/head";
import { motion } from "framer-motion";

import { commerce } from "../../lib/commerce";
import { useCartDispatch } from "../../context/cart";
import { useThemeDispatch } from "../../context/theme";

import Header from "../../components/Header";
import Button from "../../components/Button";
import VariantPicker from "../../components/VariantPicker";
import ProductImages from "../../components/ProductImages";
import ProductAttributes from "../../components/ProductAttributes";
import RelatedProducts from "../../components/RelatedProducts";

export async function getStaticProps({ params }) {
  const { permalink } = params;

  const product = await commerce.products.retrieve(permalink, {
    type: "permalink",
  });

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map(({ permalink }) => ({
      params: {
        permalink,
      },
    })),
    fallback: false,
  };
}

function ProductPage({ product }) {
  const { setCart } = useCartDispatch();
  const { variants, assets, meta, related_products } = product;
  const images = assets.filter(({ is_image }) => is_image);
  const setTheme = useThemeDispatch();

  React.useEffect(() => {
    setTheme(product.permalink);

    return () => setTheme("default");
  }, [product.permalink]);

  const addToCart = () =>
    commerce.cart.add(product.id).then(({ cart }) => setCart(cart));

  return (
    <React.Fragment>
      <Head>
        <title>{product.seo.title}</title>
        <meta name="description" content={product.seo.description}></meta>
      </Head>

      <div className="md:hidden">
        <Header />
      </div>

      <div className="md:min-h-screen md:flex md:items-center">
        <div className="flex flex-col-reverse md:flex-row space-y-3 md:space-y-0 md:space-x-10">
          <div className="md:max-h-screen md:w-1/2 flex flex-col md:flex-row items-end justify-between md:sticky md:top-0">
            <div className="hidden md:block">
              <Header />
            </div>
            <motion.div
              className="py-6 md:py-12 sticky top-0"
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
              <h1 className="font-serif italic text-2xl md:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="pr-2">
                    <p className="text-lg md:text-xl lg:text-2xl">
                      {product.price.formatted_with_symbol}
                    </p>
                  </div>

                  <VariantPicker variants={variants} />
                </div>

                <Button onClick={addToCart}>Add to Cart</Button>
              </div>

              <div
                className="pt-5 md:pt-8 lg:pt-10 md:leading-relaxed lg:leading-loose lg:text-lg"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </motion.div>
          </div>

          <div className="md:min-h-screen md:py-12 flex items-center md:w-1/2 md:z-40">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <ProductImages images={images} />
              <ProductAttributes {...meta} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-3 md:py-4 lg:py-8">
        <RelatedProducts products={related_products} />
      </div>
    </React.Fragment>
  );
}

export default ProductPage;
