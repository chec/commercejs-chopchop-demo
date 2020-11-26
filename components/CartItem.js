import React from "react";
import Image from "next/image";

import { commerce } from "../lib/commerce";
import { useCartDispatch } from "../context/cart";

function CartItem({ id, media, name, quantity, line_total, variants }) {
  const { setCart } = useCartDispatch();
  const hasVariants = variants.length >= 1;

  const handleUpdateCart = ({ cart }) => setCart(cart);

  const handleRemoveItem = () =>
    commerce.cart.remove(id).then(handleUpdateCart);

  const decrementQuantity = () => {
    quantity > 1
      ? commerce.cart
          .update(id, { quantity: quantity - 1 })
          .then(handleUpdateCart)
      : handleRemoveItem();
  };

  const incrementQuantity = () =>
    commerce.cart.update(id, { quantity: quantity + 1 }).then(handleUpdateCart);

  return (
    <div className="py-3 md:py-4 lg:py-5 flex md:items-end space-x-3 md:space-x-4 lg:space-x-5 border-b border-black">
      <div className="w-24 h-24 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded relative">
        <Image
          src={media.source}
          alt={name}
          layout="fill"
          className="object-cover rounded-lg"
          loading="eager"
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-end flex-grow">
        <div className="md:flex-grow">
          <p className="font-serif text-xl md:text-2xl lg:text-3xl italic leading-none">
            {name}
          </p>
          {hasVariants && (
            <p>
              {variants.map(({ variant_name, option_name }, index) => (
                <React.Fragment key={index}>
                  {index ? ", " : ""}
                  {variant_name}: {option_name}
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start md:items-end justify-between flex-grow">
          <div className="text-lg md:text-xl lg:text-2xl">
            {line_total.formatted_with_symbol}
          </div>
          <div className="w-full flex md:flex-col items-center md:items-end justify-between">
            <div className="md:pb-4 lg:pb-5 inline-flex items-center">
              <span className="pr-2">Quantity:</span>
              <button
                onClick={decrementQuantity}
                className="appearance-none inline-flex items-center justify-center rounded-lg border border-black w-5 h-5 text-xs text-black focus:outline-none"
              >
                -
              </button>
              <span className="px-2 md:text-lg">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="appearance-none inline-flex items-center justify-center rounded-lg border border-black w-5 h-5 text-xs text-black focus:outline-none"
              >
                +
              </button>
            </div>
            <div>
              <button
                onClick={handleRemoveItem}
                className="appearance-none inline-flex items-center justify-center rounded-lg border border-black text-xs text-black px-1 h-5 opacity-50 hover:opacity-100 focus:opacity-100 focus:outline-none transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
