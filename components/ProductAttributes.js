function ProductAttributes({ attributes = [] }) {
  if (!attributes || attributes.length === 0) return null;

  return (
    <div className="py-4 hidden md:grid grid-cols-1 md:grid-cols-2 gap-4">
      {attributes.map((fileName) => (
        <div
          key={fileName}
          className="w-full h-24 flex items-center justify-center"
        >
          <img
            src={`/product-attributes/${fileName}`}
            className="inline-block"
          />
        </div>
      ))}
    </div>
  );
}

export default ProductAttributes;
