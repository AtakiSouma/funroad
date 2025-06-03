import ProductList, {
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface CategoryProps {
  params: Promise<{ subcategory: string }>;
}

const SubCategoryPage = async ({ params }: CategoryProps) => {
  const { subcategory } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
   category: subcategory
  }));
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={subcategory}/>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default SubCategoryPage;
