"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { NavbarItem, navbarItems } from "./navbar-items";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});
export const Navbar = () => {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="h-20  flex border-b justify-between font-medium bg-white border-primary">
      <Link href={"/"} className="pl-6 items-center flex">
        <span className={cn("text-4xl font-semibold lg:text-5xl", poppins.className)}>
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

      <div className="hidden lg:flex">
        <Button
          variant={"secondary"}
          className="border-l border-t-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg "
        >
          <Link  prefetch href={"/sign-in"}>Login</Link>
        </Button>
        <Button
          variant={"secondary"}
          className="border-l border-t-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg "
        >
          <Link prefetch  href={"/sign-up"}> Start selling</Link>
        </Button>
      </div>
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
