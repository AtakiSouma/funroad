import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t font-medium bg-white ">
      <div
        className=" border-primary  gap-3 max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full  
        px-4 lg:px-12
        "
      >
        <p>Powered by</p>
        <Link href={"/"}>
          <span className={cn("text-2xl font-semibold")}>funroad</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
