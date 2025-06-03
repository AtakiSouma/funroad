import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface BreadCrumbNavigationProps {
  activeCategory?: string | undefined;
  activeCategoryName?: string | null;
  activeSubcategoryName?: string | null;
}

const BreadCrumbNavigation = ({
  activeCategory,
  activeCategoryName,
  activeSubcategoryName,
}: BreadCrumbNavigationProps) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {activeSubcategoryName ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="text-xl font-medium underline text-primary"
                >
                  <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary font-medium text-lg">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage  className="text-xl font-medium ">
                  {activeSubcategoryName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl font-medium">
                  {activeCategoryName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbNavigation;
