import { parseAsString, useQueryStates } from "nuqs";

export const userProductFilters = () => {
  return useQueryStates({
    minPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }),
    maxPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }),
  });
};
