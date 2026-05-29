"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { IoFilter } from "react-icons/io5";
import { useState } from "react";

function ProductsPage() {
  const products = [
    {
      id: 1,
      image: "/assets/product4.png",
      hoverImage: "/assets/product2.png",
      category: "Saphir Médaille Cream",
      title: "Pommadier Shoe Cream",
      description: "Rich shoe cream for smooth leather shoes, 75ml",
      badge: "Best-Seller",
      price: 4000,
    },
    {
      id: 2,
      image: "/assets/product2.png",
      hoverImage: "/assets/product4.png",
      category: "Sneaker Cleaner",
      title: "Foam Deep Cleaning Kit",
      description: "Powerful foam cleaner removes dirt and stains instantly",
      badge: "Trending",
      price: 2200,
    },
    {
      id: 3,
      image: "/assets/product1.png",
      hoverImage: "/assets/product2.png",
      category: "Protection Spray",
      title: "Water Repellent Spray",
      description: "Protects shoes from water, dust and stains",
      badge: "Best-Seller",
      price: 1800,
    },
    {
      id: 4,
      image: "/assets/product3.png",
      hoverImage: "/assets/product1.png",
      category: "Leather Care",
      title: "Premium Leather Conditioner",
      description: "Restores shine and softness to worn leather shoes",
      badge: "Trending",
      price: 3500,
    },
    {
      id: 5,
      image: "/assets/product1.png",
      hoverImage: "/assets/product3.png",
      category: "Protection Spray",
      title: "Water Repellent Spray",
      description: "Protects shoes from water, dust and stains",
      badge: "Best-Seller",
      price: 1800,
    },
    {
      id: 6,
      image: "/assets/product2.png",
      hoverImage: "/assets/product1.png",
      category: "Cleaner",
      title: "Sneaker Wipes",
      description: "Quick wipes for daily shoe cleaning",
      badge: "Trending",
      price: 1200,
    },
    {
      id: 7,
      image: "/assets/product3.png",
      hoverImage: "/assets/product4.png",
      category: "Shine",
      title: "Gloss Polish",
      description: "Adds premium glossy finish to shoes",
      badge: "Best-Seller",
      price: 2500,
    },
    {
      id: 8,
      image: "/assets/product1.png",
      hoverImage: "/assets/product2.png",
      category: "Care Kit",
      title: "Luxury Shoe Kit",
      description: "Full premium shoe care set",
      badge: "Trending",
      price: 6000,
    },
    {
      id: 9,
      image: "/assets/product2.png",
      hoverImage: "/assets/product3.png",
      category: "Conditioner",
      title: "Leather Softener",
      description: "Softens and restores leather texture",
      badge: "Best-Seller",
      price: 3200,
    },
  ];

  const BadgeStyles = (type: string): string => {
    switch (type) {
      case "Best-Seller":
        return "bg-emerald-400 text-white";

      case "Trending":
        return "bg-amber-400 text-black";

      default:
        return "bg-gray-300 text-black";
    }
  };

  // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = products.slice(startIndex, endIndex);

  const goToPage = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);

  const prevPage = () => goToPage(currentPage - 1);

  return (
    <section className="py-16 px-6 bg-white min-h-screen">
      {/* HERO */}
      <div className="flex flex-col justify-center h-40 w-full border-white items-center gap-3">
        <h1 className="text-5xl font-bold">Shoe Care</h1>
        <p className="w-150 text-center text-xm line-clamp-6 tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
          dolorem consequatur? Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Tempora, aliquid ea? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Temporibus quisquam provident
          perferendis doloremque, sed consectetur eius neque laboriosam. Quas,
          corrupti ab. Assumenda corporis error ratione laboriosam placeat
          veritatis facilis quos.
        </p>
      </div>
      <div className="flex justify-between p-5">
        <div className="p-5">
          <h1>All Products</h1>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <p className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition">
              <IoFilter />
              Filter & Sort
            </p>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-center text-2xl">
                Filter
              </SheetTitle>

              <hr className="border-gray-300" />

              <SheetDescription className="text-center">
                Customize your shopping experience.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-center text-lg">
                  Treatment Type
                </h3>

                <div className="space-y-2 px-5">
                  {[
                    "Protect",
                    "Dye leather",
                    "Shine",
                    "Clean",
                    "Condition",
                  ].map((t) => (
                    <label key={t} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="accent-emerald-400 cursor-pointer"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-center text-lg">
                  Price Range
                </h3>

                <div className="flex gap-2">
                  <Input placeholder="Min" />
                  <Input placeholder="Max" />
                </div>
              </div>
            </div>

            <SheetFooter>
              <div className="flex justify-center gap-3 mt-8">
                <Button className="bg-emerald-500 hover:bg-emerald-600 w-40">
                  Apply
                </Button>

                <SheetClose asChild>
                  <Button variant="destructive" className="w-40">
                    Close
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-5">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-lg"
          >
            <div className="relative w-full h-80 overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-0"
              />

              <Image
                src={product.hoverImage}
                alt={product.title}
                fill
                className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="absolute top-3 left-3">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-md ${BadgeStyles(
                    product.badge,
                  )}`}
                >
                  {product.badge === "Best-Seller"
                    ? "Best Seller"
                    : "Low Stock"}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-sm text-gray-400 mb-1">{product.category}</h2>

              <div className="space-y-1">
                <p className="text-sm font-medium">{product.title}</p>

                <p className="text-xs text-gray-500 line-clamp-2">
                  {product.description}
                </p>

                <p className="text-sm font-bold text-emerald-600">
                  Rs {product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination className="mt-10">
        <PaginationContent>
          {/* PREVIOUS */}
          <PaginationItem>
            <PaginationPrevious
              onClick={prevPage}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* PAGE NUMBERS */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => goToPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer bg-gray-50"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* ELLIPSIS */}
          {totalPages > 4 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* NEXT */}
          <PaginationItem>
            <PaginationNext
              onClick={nextPage}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}

export default ProductsPage;
