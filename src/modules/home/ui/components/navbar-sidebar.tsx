import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}
interface NavbarSidebarProps {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
  items,
  onOpenChange,
  open,
}: NavbarSidebarProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b border-primary">
          <div className="flex items-center">
            <SheetTitle className="">Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          <div className="flex flex-col overflow-y-auto h-full pb-2">
            {items.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={() => onOpenChange(false)}
                className="w-full p-4 text-left hover:bg-black hover:text-white font-medium text-base"
              >
                {item.children}
              </Link>
            ))}
            <div className="border-t border-primary flex flex-col ">
              <Link
                href={"/sign-in"}
                onClick={() => onOpenChange(false)}
                className="w-full p-4 text-left hover:bg-black hover:text-white font-medium text-base"
              >
                Login
              </Link>
              <Link
                href={"/sign-up"}
                onClick={() => onOpenChange(false)}
                className="w-full p-4 text-left hover:bg-black hover:text-white font-medium text-base"
              >
                Start selling
              </Link>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
