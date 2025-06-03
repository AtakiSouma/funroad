"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ProductListProps {
  category?: string;
}

const ProductList = ({ category }: ProductListProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
    })
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data?.docs.map((product) => (
        <div
          key={product.id}
          className="border rounded-md bg-white p-4 shadow-sm"
        >
          <h2 className="text-xl font-medium">{product.name}</h2>
          <p className="text-xl font-medium">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

export const ProductListSkeleton = ({}: ProductListProps) => {
  return (
    <div>
      <>Loading</>
    </div>
  );
};
