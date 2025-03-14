import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { Product, RootObject } from "@/types/types";
import { fetchApi } from "@/service/api";
import { DataRenderer } from "@/components/DataRenderer";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{
  employees: RootObject[];
}> = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching new data...`);

    const response = await fetchApi<{ employees: RootObject[] }>(
      "https://node-server-d14o.onrender.com/api/"
    );

    const employees = response?.employees || [];

    if (!employees.length) {
      console.error("Error: No products received from API.");
    }

    return {
      props: { employees },
      revalidate: 60,
    };
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error fetching products:`,
      error
    );
    return { props: { employees: [] } };
  }
};

export default function ProductListPage({
  employees,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {/* {items.length > 0 ? (
        items.map((item: Product) => (
          <div key={item._id}>
            <DataRenderer
              items={item}
              excludeKeys={["_id", "imageUrls"]}
              valueOnlyKeys={["category"]}
            />
            <Link
              href={{
                pathname: "/products/[id]",
                query: { id: item._id },
              }}
            >
              View Product
            </Link>
          </div>
        ))
      ) : (
        <p>No blogs available.</p>
      )} */}
    </>
  );
}
