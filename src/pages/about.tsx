import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { ProductList } from "@/types/types";
import { fetchApi } from "@/service/api";
import { DataRenderer } from "@/components/DataRenderer";

export const getStaticProps: GetStaticProps<{
  products: ProductList[];
}> = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching new data...`);
    const products = await fetchApi<ProductList[]>(
      "https://nextjs-server-rho.vercel.app/api/products/getAllProducts/route"
    );

    if (!products || products.length === 0) {
      throw new Error("No food data received");
    }

    console.log(
      `[${new Date().toISOString()}] Successfully fetched ${
        products.length
      } food items`
    );

    return {
      props: { products },
      revalidate: 60, // Refresh data every 60 seconds
    };
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error fetching food data:`,
      error
    );
    return { props: { products: [] } };
  }
};

export default function Page({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <DataRenderer
            key={product._id}
            item={product}
            excludeKeys={[
              "id",
              "_id",
              "manufacturer",
              "productName",
              "imageUrls",
              "image",
            ]}
            valueOnlyKeys={["category", "description "]}
          />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
