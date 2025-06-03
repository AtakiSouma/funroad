import { formatCurrency } from "@/utils/currency/format";
import { generateTenantURL } from "@/utils/generate/generate-tenant-url";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCardsProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

const ProductCards = ({
  id,
  name,
  imageUrl,
  tenantSlug,
  tenantImageUrl,
  reviewCount,
  reviewRating,
  price,
}: ProductCardsProps) => {
  const router = useRouter();
  const handleUserClickToTenant = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(generateTenantURL(tenantSlug));
  };
  return (
    <Link href={`/products/${id}`}>
      <div
        className="border border-primary bg-white overflow-hidden h-full flex flex-col 
      hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      "
      >
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            src={imageUrl ?? "/placeholder.png"}
            className="object-cover"
          />
        </div>
        <div className="p-4 border-t flex flex-col gap-3 flex-1 border-primary">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          <div
            className="flex items-center gap-2"
            onClick={handleUserClickToTenant}
          >
            {tenantImageUrl && (
              <Image
                src={tenantImageUrl}
                alt={tenantSlug}
                width={20}
                height={20}
                className="rounded-full border border-primary shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium">{tenantSlug}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4 border-t-1 border-primary">
          <div className="relative px-2 py-1 border border-primary bg-pink-400 w-fit">
            <p className="text-sm font-medium">{formatCurrency(price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCards;
export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse"></div>
  );
};
