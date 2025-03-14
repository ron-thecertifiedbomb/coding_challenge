import { GetServerSideProps } from "next";

async function getProduct(id: string) {
  const response = await fetch(`https://node-server-d14o.onrender.com/api/${id}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default function ProductPage({
  product,
}: {
  product?: { name: string; description: string; price: number };
}) {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { id } = context.params as { id: string };
  const product = await getProduct(id);

  return {
    props: { product },
  };
};
