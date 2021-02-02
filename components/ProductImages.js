import Image from "next/image";

function ProductImages({ images = [] }) {
  if (!images || images.length === 0) return null;

  return images.map(({ id, url, image_dimensions }) => (
    <div key={id} className="md:py-3">
      <Image
        key={id}
        src={url}
        width={image_dimensions.width}
        height={image_dimensions.height}
        className="rounded-lg hover:rounded-none transition-all"
        quality={100}
        alt=""
      />
    </div>
  ));
}

export default ProductImages;
