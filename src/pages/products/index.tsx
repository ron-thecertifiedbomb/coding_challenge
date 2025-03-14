import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { Product } from "@/types/types";
import { fetchApi } from "@/service/api";
import { DataRenderer } from "@/components/DataRenderer";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{
  items: Product[];
}> = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching new data...`);

    const response = await fetchApi<{ products: Product[] }>(
      "https://node-server-d14o.onrender.com/api/"
    );

    const items = response?.products || [];

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

export default function ProductListPage({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {items.length > 0 ? (
        items.map((item: Product) => (
          <div key={item._id}>
            <DataRenderer
              items={item}
              excludeKeys={["_id"]}
              valueOnlyKeys={["category"]}
            />
            <Link
              href={{
                pathname: "/product/[id]",
                query: { id: item._id },
              }}
            >
              View Product
            </Link>
          </div>
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </>
  );
}
