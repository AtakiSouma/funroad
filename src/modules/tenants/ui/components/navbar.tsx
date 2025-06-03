"use client";

import { useTRPC } from "@/trpc/client";
import { generateTenantURL } from "@/utils/generate/generate-tenant-url";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  slug: string;
}

const Navbar = ({ slug }: NavbarProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );
  return (
    <div>
      <nav className="h-20 border-b font-medium bg-white">
        <div
          className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full  
        px-4 lg:px-12
        "
        >
          <Link href={generateTenantURL(slug)} className="flex items-center gap-2">
            {data.image?.url && (
              <Image
                src={data?.image?.url}
                alt={slug}
                width={32}
                height={32}
                className="rounded-full border shrink-0 size-[32px] border-primary"
              />
            )}
            <p className="text-xl">{data.name}</p>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

export const NavbarSkeleton = () => {
  return (
    <div>
      <nav className="h-20 border-b font-medium bg-white">
        <div
          className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full  
        px-4 lg:px-12
        "
        >
          {/* SKELETON */}
        </div>
      </nav>
    </div>
  );
};
