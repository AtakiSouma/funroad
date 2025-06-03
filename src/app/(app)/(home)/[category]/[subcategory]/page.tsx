import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/searchParam";
import ProductListView from "@/modules/products/ui/views/product-list-view";
interface SubCategoryProps {
  params: Promise<{ subcategory: string }>;
  searchParams: Promise<SearchParams>;
}

const SubCategoryPage = async ({ params, searchParams }: SubCategoryProps) => {
  const { subcategory } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category: subcategory,
      ...filters,
    })
  );
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView category={subcategory} />
      </HydrationBoundary>
    </div>
  );
};

export default SubCategoryPage;
