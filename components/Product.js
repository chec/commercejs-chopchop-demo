import Image from "next/image";
import Link from "next/link";
import cc from "classcat";

function Product({ media, name, permalink, price, className }) {
  const imageClass = cc([
    "relative rounded-lg hover:rounded-none overflow-hidden w-full",
    className,
  ]);

  return (
    <Link href={`/products/${permalink}`}>
      <a className="group relative">
        {media?.source && (
          <div className={imageClass}>
            <Image
              src={media.source}
              alt={Product.name}
              layout="fill"
              quality={100}
              loading="eager"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex justify-between py-2 space-x-1">
          <span className="text-sm md:text-base">{name}</span>
          <span className="text-sm md:text-base">
            {price.formatted_with_symbol}
          </span>
        </div>
      </a>
    </Link>
  );
}

export default Product;
