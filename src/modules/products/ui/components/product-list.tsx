"use client";

import { useTRPC } from "@/trpc/client";
import {
  useQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { userProductFilters } from "../../hooks/use-product-filters";
import ProductCards from "./product-cards";
import { DEFAULT_LIMIT } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";

interface ProductListProps {
  category?: string;
}

const ProductList = ({ category }: ProductListProps) => {
  const [filters] = userProductFilters();

  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.products.getMany.queryOptions({ category, ...filters })
  );
  // const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
  //   useSuspenseInfiniteQuery(
  //     trpc.products.getMany.infiniteQueryOptions(
  //       {
  //         ...filters,
  //         category,
  //         limit: DEFAULT_LIMIT,
  //       },
  //       {
  //         getNextPageParam: (lastPage) => {
  //           return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
  //         },
  //       }
  //     )
  //   );
  // if (data.pages?.[0]?.docs.length === 0) {
  //   return (
  //     <div className="border border-black border-dashed flex items-center justify-center p-8  flex-col gap-y-4 bg-white w-full rounded-lg">
  //       <InboxIcon />
  //       <p className="text-base font-medium">No product found</p>
  //     </div>
  //   );
  // }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {/* {data?.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCards
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              authorUsername="hoangnam"
              authorImageUrl={
                "https://i.pinimg.com/736x/20/9f/ba/209fbaa015cdb58711f04574b3bfee65.jpg"
              }
              reviewCount={100}
              reviewRating={4}
              price={product.price}
            />
          ))} */}
        {data?.docs.map((product) => (
          <ProductCards
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.image?.url}
            authorUsername="hoangnam"
            authorImageUrl={
              "https://i.pinimg.com/736x/20/9f/ba/209fbaa015cdb58711f04574b3bfee65.jpg"
            }
            reviewCount={100}
            reviewRating={4}
            price={product.price}
          />
        ))}
      </div>
      {/* <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            variant="elevated"
            className="font-medium disabled:opacity-50 text-base bg-white"
          >
            Load more...
          </Button>
        )}
      </div> */}
    </>
  );
};

export default ProductList;

export const ProductListSkeleton = ({}: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductListSkeleton key={index} />
      ))}
    </div>
  );
};
