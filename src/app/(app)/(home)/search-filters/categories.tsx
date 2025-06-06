"use client";
import { useEffect, useRef, useState } from "react";
import CategoryDropdown from "./category-dropdown";
import { CustomCategory } from "@/types/category-type";
import { Button } from "@/components/ui/button";
import { ListFilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import CategoriesSidebar from "./category-sidebar";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useParams } from "next/navigation";

interface CategoriesProps {
  data: CategoriesGetManyOutput;
}

const Categories = ({ data }: CategoriesProps) => {
  const params = useParams();
  console.log(params)
  const categoryParam = params.category as string | undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeCategory = categoryParam || "all";
  const activeCategoryIndex = data.findIndex(
    (cat) => cat.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;
      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);

      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visible++;
      }
      setVisibleCount(visible);
    };
    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);

    return () => resizeObserver.disconnect();
  }, [data.length]);
  return (
    <div className="relative w-full">
      {/* Categories sidebar */}
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      {/* Hidden div to measure all items */}
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-auto flex"
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {data.map((category: CategoriesGetManyOutput[1]) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
      {/* visible items */}
      <div
        ref={containerRef}
        className="flex flex-nowrap  items-center"
        onMouseEnter={() => setIsAnyHovered(false)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {data
          .slice(0, visibleCount)
          .map((category: CategoriesGetManyOutput[1]) => (
            <div key={category.id}>
              <CategoryDropdown
                category={category}
                isActive={activeCategory === category.slug}
                isNavigationHovered={isAnyHovered}
              />
            </div>
          ))}
        <div ref={viewAllRef} className="shrink-0">
          <Button
          variant={"elevated"}
            className={cn(
              "cursor-pointer h-11 px-4 bg-transparent  border-transparent rounded-full hover:bg-white hover:border-primary  text-black ",
              isActiveCategoryHidden &&
                !isAnyHovered &&
                "bg-white  border-primary"
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All <ListFilterIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
