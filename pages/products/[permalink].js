import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { commerce } from "../../lib/commerce";
import { useCartDispatch } from "../../context/cart";
import { useThemeDispatch } from "../../context/theme";
import { useModalDispatch } from "../../context/modal";

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
    revalidate: 60,
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
  const {
    variant_groups: variantGroups,
    assets,
    meta,
    related_products: relatedProducts,
  } = product;
  const images = assets.filter(({ is_image }) => is_image);
  const setTheme = useThemeDispatch();
  const { openModal } = useModalDispatch();

  const initialVariants = React.useMemo(
    () =>
      variantGroups.reduce((all, { id, options }) => {
        const [firstOption] = options;

        return { ...all, [id]: firstOption.id };
      }, {}),
    [product.permalink]
  );

  const [selectedVariants, setSelectedVariants] = React.useState(
    initialVariants
  );

  React.useEffect(() => {
    setSelectedVariants(initialVariants);
    setTheme(product.permalink);

    return () => setTheme("default");
  }, [product.permalink]);

  const handleVariantChange = ({ target: { id, value } }) =>
    setSelectedVariants({
      ...selectedVariants,
      [id]: value,
    });

  const addToCart = () =>
    commerce.cart
      .add(product.id, 1, selectedVariants)
      .then(({ cart }) => {
        setCart(cart);

        return cart;
      })
      .then(({ subtotal }) =>
        toast(
          `${product.name} is now in your cart. Your subtotal is now ${subtotal.formatted_with_symbol}. Click to view what's in your cart.`,
          {
            onClick: openModal,
          }
        )
      )
      .catch(() => {
        toast.error("Please try again.");
      });

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
              <h1 className="font-serif font-medium italic text-2xl md:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center">
                  <div className="pr-2">
                    <p className="text-lg md:text-xl lg:text-2xl font-sans">
                      {product.price.formatted_with_symbol}
                    </p>
                  </div>

                  <VariantPicker
                    variantGroups={variantGroups}
                    defaultValues={initialVariants}
                    onChange={handleVariantChange}
                  />
                </div>

                <Button onClick={addToCart}>Add to Bag</Button>
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
        <RelatedProducts products={relatedProducts} />
      </div>
    </React.Fragment>
  );
}

export default ProductPage;
