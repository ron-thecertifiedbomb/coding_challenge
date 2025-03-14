import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { ProductList } from "@/types/types";
import { fetchApi } from "@/service/api";
import { DataRenderer } from "@/components/DataRenderer";

export const getStaticProps: GetStaticProps<{
  items: ProductList[];
}> = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching new data...`);

    const response = await fetchApi<{ products: ProductList[] }>(
      "https://node-server-d14o.onrender.com/api/"
    );

    const items = response?.products || [];

    console.log(`[${new Date().toISOString()}] Received items:`, items);

    if (!items.length) {
      console.error("Error: No products received from API.");
    }

    return {
      props: { items },
      revalidate: 60, 
    };
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error fetching products:`,
      error
    );
    return { props: { items: [] } };
  }
};

export default function Page({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {items.length > 0 ? (
        items.map((item: ProductList) => (
          <DataRenderer
            key={item._id}
            items={item}
            excludeKeys={["_id"]}
            valueOnlyKeys={["category"]}
          />
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </>
  );
}
