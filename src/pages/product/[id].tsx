import ProductImageCarousel from "@/components/carousel/Carousel";
import { Product } from "@/types/types";
import { GetServerSideProps } from "next";
import Image from "next/image";

async function getProduct(id: string): Promise<Product | null> {
  const response = await fetch(
    `https://node-server-d14o.onrender.com/api/${id}`
  );

  if (!response.ok) {
    return null;
  }

  const { product } = await response.json();
  return product;
}
export default function ProductPage({ product }: { product?: Product }) {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1>{product.productName}</h1>
      <p>Manufacturer: {product.manufacturer}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>

      <ProductImageCarousel images={product.imageUrls} />

      <>
        {product.includedItems.length > 0 && (
          <>
            <h4>Included Items</h4>
            <ul>
              {product.includedItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {product.availableColors?.length > 0 && (
          <>
            <h4>Available Colors</h4>
            <p>{product.availableColors.join(", ")}</p>
          </>
        )}
      </>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const selectedProduct = await getProduct(id);

  return { props: { product: selectedProduct } };
};
