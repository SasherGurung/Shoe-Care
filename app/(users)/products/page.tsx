"use client";

import { Button } from "@/components/ui/button";
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
import { cantarell } from "@/app/fonts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { IoFilter } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useProductStore } from "@/lib/stores/Products/productStore";

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

function ProductsPage() {
  const { fetchProduct } = useProductStore();
  const [products, setProducts] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [appliedSortPrice, setAppliedSortPrice] = useState("");

  const itemsPerPage = 8;

  const filteredProducts = [...products]
    .filter((product) =>
      appliedCategory ? product.category === appliedCategory : true,
    )
    .sort((a, b) => {
      if (appliedSortPrice === "low-high") {
        return a.price - b.price;
      }

      if (appliedSortPrice === "high-low") {
        return b.price - a.price;
      }

      return 0;
    });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const getStatus = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  const availabilityStyles = (type: string): string => {
    switch (type) {
      case "In Stock":
        return "bg-emerald-400 text-white";

      case "Low Stock":
        return "bg-amber-400 text-black";

      case "Out of Stock":
        return "bg-red-500 text-white";

      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <section className="px-6 bg-white min-h-screen">
      <div className="flex flex-col justify-center h-50 w-full items-center gap-3">
        <h1 className={`text-4xl tracking-widest ${cantarell.className}`}>
          OUR PRODUCTS
        </h1>

        <div className="w-20 h-px bg-gray-300" />

        <p className="max-w-xl text-center text-sm text-gray-500 tracking-wide leading-relaxed">
          Elevate your footwear care ritual with carefully curated essentials
          designed to preserve craftsmanship, enhance durability, and maintain
          timeless elegance in every step.
        </p>
      </div>
      <div className="flex justify-between p-5 border-b border-t">
        <div className="p-2">
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
              <SheetTitle className="text-center text-2xl">Filter</SheetTitle>

              <hr className="border-gray-300" />

              <SheetDescription className="text-center">
                Customize your shopping experience.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-center text-lg">
                  Treatment Category
                </h3>

                <div className="space-y-2 px-5">
                  {[
                    "Shoe Wax",
                    "Shoe Kit",
                    "Shoe Brush",
                    "Shoe Care",
                    "Shoe Accessory",
                    "Polish Cloth",
                    "Shoe Protection",
                    "Shoe Cleanser",
                    "Shoe Cream",
                  ].map((t) => (
                    <label key={t} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="category"
                        value={t}
                        checked={selectedCategory === t}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="accent-emerald-400 cursor-pointer"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-center text-lg">
                  Sort By Price
                </h3>

                <div className="space-y-3 px-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value=""
                      checked={sortPrice === ""}
                      onChange={() => setSortPrice("")}
                      className="accent-emerald-400"
                    />
                    Default
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="low-high"
                      checked={sortPrice === "low-high"}
                      onChange={() => setSortPrice("low-high")}
                      className="accent-emerald-400"
                    />
                    Price: Low to High
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="high-low"
                      checked={sortPrice === "high-low"}
                      onChange={() => setSortPrice("high-low")}
                      className="accent-emerald-400"
                    />
                    Price: High to Low
                  </label>
                </div>
              </div>
            </div>

            <SheetFooter>
              <div className="flex justify-center gap-3 mt-8">
                <Button
                  onClick={() => {
                    setAppliedCategory(selectedCategory);
                    setAppliedSortPrice(sortPrice);
                    setCurrentPage(1);
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 w-40"
                >
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-5">
        {paginatedProducts.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="group cursor-pointer bg-white rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-lg">
              <div className="relative w-full h-80 overflow-hidden">
                <Image
                  src={product.images[0] || product.thumbnail}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />

                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="absolute top-3 left-3">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-md ${availabilityStyles(
                      getStatus(product.stock),
                    )}`}
                  >
                    {getStatus(product.stock)}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-sm text-gray-400 mb-1">
                  {product.category}
                </h2>

                <div className="space-y-1">
                  <p className="text-sm font-medium">{product.title}</p>

                  <p className="text-xs text-gray-500 line-clamp-1">
                    {product.description}
                  </p>

                  <p className="text-sm font-bold text-emerald-600">
                    Rs {product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination className="mb-8 flex">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
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
