"use client";

import { IoMdSearch } from "react-icons/io";
import { IoPersonOutline, IoBagHandleOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { lavishly } from "@/app/fonts";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCartStore from "@/src/stores/cartStore";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";

type Products = {
  id: string;
  images: string[];
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  stock: number;
};

function Navbar() {
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState<Products[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.log(error);
        return;
      }
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchItem.toLowerCase()),
  );
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
    { label: "SHOE CARE", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  const cart = useCartStore((state) => state.cart);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="w-full top-0 left-0 sticky z-50 border-b">
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
                    <IoIosArrowUp className="transition-transform duration-300 group-hover:rotate-180" />
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
                    onChange={handleSearch}
                    value={searchItem}
                    className="w-full border border-gray-300 rounded-2xl px-3 py-2 outline-none focus:border-emerald-500"
                  />
                </div>
                <SheetDescription className="text-xs text-center font-bold mt-3">
                  Need some inspirations?
                </SheetDescription>
              </SheetHeader>
              <div className="mt-5 space-y-3">
                {(searchItem ? filteredProducts : products.slice(0, 5)).map(
                  (product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-3 flex gap-5"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={65}
                        height={65}
                        priority
                        className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                      />
                      <div>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {product.category}
                        </p>
                        <p className="font-semibold">{product.title}</p>
                        
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </SheetContent>
          </Sheet>
          <div
            className="hover:text-emerald-400 flex gap-1 hover:scale-105 transition-all duration-200 items-center relative cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            <IoBagHandleOutline size={18} />
            Cart
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
