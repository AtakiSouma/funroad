"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQueries, useQuery } from "@tanstack/react-query";
import { NavbarSidebar } from "@/modules/home/ui/components/navbar-sidebar";
import { NavbarItem, navbarItems } from "@/components/home/navbar/navbar-items";
import { poppins } from "@/lib/fonts";

export const Navbar = () => {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-20  flex border-b justify-between font-medium bg-white border-primary">
      <Link href={"/"} className="pl-6 items-center flex">
        <span
          className={cn(
            "text-4xl font-semibold lg:text-5xl",
            poppins.className
          )}
        >
          funroad
        </span>
      </Link>
      <NavbarSidebar
        items={navbarItems}
        onOpenChange={() => setIsSidebarOpen(!isSidebarOpen)}
        open={isSidebarOpen}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            href={item.href}
            key={item.href}
            isActive={pathName === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
      {session?.data?.user ? (
        <>
          <div className="hidden lg:flex">
            <Button
              variant={"secondary"}
              className="border-l border-t-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg "
            >
              <Link prefetch href={"/admin"}>
                Dashboard
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="hidden lg:flex">
            <Button
              variant={"secondary"}
              className="border-l border-t-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg "
            >
              <Link prefetch href={"/login"}>
                Login
              </Link>
            </Button>
            <Button
              variant={"secondary"}
              className="border-l border-t-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg "
            >
              <Link prefetch href={"/sign-up"}>
                Start selling
              </Link>
            </Button>
          </div>
        </>
      )}

      <div className="flex lg:hidden items-center justify-center">
        <Button
          size="icon-large"
          variant={"ghost"}
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
