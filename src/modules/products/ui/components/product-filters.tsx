"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import PriceFilters from "./price-filters";
import { userProductFilters } from "../../hooks/use-product-filters";

interface ProductFiltersProps {
  title: string;
  className: string;
  children: React.ReactNode;
}
const ProductFilter = ({ children, className, title }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;
  return (
    <div
      className={cn(
        "p-4 border-b border-primary flex flex-col gap-2",
        className
      )}
    >
      <div
        className="flex justify-between"
        onClick={() => setIsOpen((current) => !current)}
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
};
const ProductFilters = () => {
  const [filters, setFilters] = userProductFilters();
  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };
  return (
    <div className="border rounded-md border-primary bg-white">
      <div className="p-4 border-b border-primary flex items-center justify-between">
        <p className="font-medium">Filters</p>
        <button className="underline" type="button" onClick={() => {}}>
          Clear
        </button>
      </div>
      <ProductFilter title="Price" className="border-b-0">
        <PriceFilters
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
          onMinPriceChange={(value) => onChange("minPrice", value)}
        />
      </ProductFilter>
    </div>
  );
};

export default ProductFilters;
