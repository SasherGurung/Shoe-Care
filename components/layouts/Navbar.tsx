"use client";

import { IoMdSearch } from "react-icons/io";
import { IoPersonOutline, IoBagHandleOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { lavishly } from "@/app/fonts";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  const router = useRouter();

  const navLinks = [
    {
      label: "SHOP ALL",
      children: [
        "SNEAKER CARE",
        "LEATHER CARE",
        "BUNDLE, KITS & PACKS",
        "INSOLES",
      ],
    },
    {
      label: "FOOT CARE",
      children: ["INSOLES", "SOCKS"],
    },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="w-full top-0 left-0 sticky z-50">
      <div className=" bg-white p-2 grid grid-cols-3 items-center ">
        <div className="flex px-5">
          {navLinks.map((items, index) => {
            const hasChildren = (items.children?.length ?? 0) > 0;

            return hasChildren ? (
              <HoverCard key={index} openDelay={10} closeDelay={50}>
                <HoverCardTrigger asChild>
                  <Button
                    variant="link"
                    className="group font-bold tracking-wider hover:text-emerald-400 text-xm transition cursor-pointer"
                  >
                    {items.label}
                    <IoIosArrowUp className="block group-hover:hidden" />
                    <IoIosArrowDown className="hidden group-hover:block" />
                  </Button>
                </HoverCardTrigger>

                <HoverCardContent
                  className="flex flex-col bg-black text-white border border-emerald-400 font-bold"
                  align="start"
                >
                  {items.children?.map((child, i) => (
                    <p
                      key={i}
                      className="cursor-pointer px-4 py-3 hover:bg-amber-400 hover:text-black"
                    >
                      {child}
                    </p>
                  ))}
                </HoverCardContent>
              </HoverCard>
            ) : (
              <Link key={index} href={items.href ?? ""}>
                <Button
                  variant="link"
                  className="font-bold tracking-wider hover:text-emerald-400 transition cursor-pointer"
                >
                  {items.label}
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => router.push("/")}
            className={`${lavishly.className} text-6xl cursor-pointer`}
          >
            Shoe Care
          </button>
        </div>

        <div className="flex gap-4 items-center justify-end cursor-pointer px-5">
          <div className="hover:text-emerald-400 flex gap-1 hover:scale-105 transition-all duration-200 items-center">
            <IoPersonOutline size={18} /> Account
          </div>
          <Sheet>
            <SheetTrigger>
              <div className="hover:text-emerald-400 cursor-pointer flex gap-1 hover:scale-105 transition-all duration-200 items-center">
                <IoMdSearch size={18} /> Search
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-center text-2xl font-bold">
                  SEARCH
                </SheetTitle>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full border border-gray-300 rounded-2xl px-3 py-2 outline-none focus:border-emerald-500"
                  />
                </div>
                <SheetDescription className="text-xs text-center font-bold mt-3">
                  Need some inspirations?
                </SheetDescription>

                <div>
                  
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <div className="hover:text-emerald-400 flex gap-1 hover:scale-105 transition-all duration-200 items-center">
            <IoBagHandleOutline size={18} /> Cart
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
