"use client";
import { Input } from "@/components/ui/input";
import { CustomCategory } from "@/types/category-type";
import {
  Bookmark,
  BookmarkCheckIcon,
  ListFilterIcon,
  SearchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import CategoriesSidebar from "./category-sidebar";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface SearchInputProps {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: SearchInputProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar onOpenChange={setIsSidebarOpen} open={isSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          name="search"
          type="text"
          placeholder="Search product ..."
          className="pl-8 border-primary py-4"
          disabled={disabled}
        />
      </div>

      {/* TODO : Add categories view all button */}
      <Button
        variant={"elevated"}
        className="size-12 shrink-0 lg:hidden border-primary"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* Add library button */}
      {session?.data?.user && (
        <>
          <Link href="/library">
            <Button
              variant="elevated"
              className="border-primary flex items-center"
            >
              <BookmarkCheckIcon className="mr-2" />
              Library
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default SearchInput;
