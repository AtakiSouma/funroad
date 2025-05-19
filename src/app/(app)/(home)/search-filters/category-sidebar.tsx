"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useTRPC } from "@/trpc/client";
import { CustomCategory } from "@/types/category-type";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CategoriesSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // data: CustomCategory[];
}

const CategoriesSidebar = ({
  onOpenChange,
  open,
}: // data,
CategoriesSidebarProps) => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<
   CategoriesGetManyOutput| null
  >(null);
  const [selectedCategories, setSelectedCategories] =
    useState<CategoriesGetManyOutput[1] | null>(null);
  const handleOpenChange = (open: boolean) => {
    setSelectedCategories(null);
    setParentCategories(null);
    onOpenChange(open);
  };
  const currentCategories = parentCategories ?? data ?? [];
  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategories(category);
    } else {
      //leaf category ( no sub)
      if (parentCategories && selectedCategories) {
        router.push(`${selectedCategories.slug}/${category.slug}`);
      } else {
        // main
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };
  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategories(null);
    }
  };
  const backgroundColor = selectedCategories?.color || "white";
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto">
          {parentCategories && (
            <div className="flex flex-col overflow-y-auto h-full pb-2">
              <button
                onClick={handleBackClick}
                className=" cursor-pointer w-full text-left p-4 hover:bg-black  hover:text-white  flex items-center text-base font-medium"
              >
                <ChevronLeftIcon className="size-4 mr-2" />
                Back
              </button>
            </div>
          )}
          {currentCategories.map((category) => (
            <button
              className=" cursor-pointer w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium "
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesSidebar;
