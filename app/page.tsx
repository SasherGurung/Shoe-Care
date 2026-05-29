"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();

  const features = [
    {
      title: "FREE SHIPPING",
      description: "Free shipping on orders above $50",
    },
    {
      title: "30 DAYS RETURN",
      description: "Simply return it within 30 days for exchange or refund",
    },
    {
      title: "SUPPORT 24/7",
      description: "Contact us 24 hours a day, 7 days a week",
    },
    {
      title: "100% PAYMENT SECURE",
      description: "Secure encrypted payments",
    },
  ];

  const products = [
    {
      image: "/assets/shoe1.png",
      category: "Foam",
      title: "Premium Shoe Foam Cleaner",
      hoverImage: "/assets/product3.png",
      badge: "Trending",
      price: "Rs. 900",
    },
    {
      image: "/assets/shoe.png",
      category: "Foam",
      hoverImage: "/assets/product2.png",
      title: "Deep Cleaning Kit",
      price: "Rs. 900",
      badge: "Best-Seller",
    },
    {
      image: "/assets/shoe1.png",
      category: "Foam",
      title: "Protection Spray",
      hoverImage: "/assets/product1.png",
      price: "Rs. 900",
      badge: "Trending",
    },
    {
      image: "/assets/shoe.png",
      category: "Foam",
      title: "Sneaker Care Kit",
      hoverImage: "/assets/product3.png",
      price: "Rs. 900",
      badge: "Best-Seller",
    },
    {
      image: "/assets/shoe1.png",
      category: "Foam",
      title: "Protection Spray",
      hoverImage: "/assets/product2.png",
      price: "Rs. 900",
      badge: "Trending",
    },
  ];

  const guideCards = [
    {
      image: "/assets/shoe.png",
      title: "Product Guide",
      desc1: "Shoes care essentials are important for long-lasting wear.",
      desc2:
        "Learn how proper maintenance keeps your sneakers fresh, clean, and protected from damage.",
      link: "/about",
      buttonText: "Read More",
    },
    {
      image: "/assets/shoe1.png",
      title: "Care Tips",
      desc1: "Proper cleaning improves durability and appearance.",
      desc2:
        "Discover expert techniques to maintain your footwear in premium condition.",
      link: "/contact",
      buttonText: "Read More",
    },
  ];

  const BadgeStyles = (type: string) => {
    switch (type) {
      case "Best-Seller":
        return "bg-emerald-400 text-white";

      case "Trending":
        return "bg-amber-400 text-black";

      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="relative w-full h-screen">
            <Image
              src="/assets/shoe.png"
              alt="Hero sneaker"
              fill
              priority
              className="object-fill"
            />

            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        <div className="absolute inset-0 " />

        <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
          <div className="space-y-5">
            <h1
              className={`text-white font-bold tracking-wide uppercase text-4xl`}
            >
              Premium Sneaker Care Studio
            </h1>

            <p className="text-white text-xm">
              Luxury sneaker care products designed to keep your shoes fresh and
              protected.
            </p>

            <button
              onClick={() => router.push("/products")}
              className="mt-4 px-7 py-3 rounded-2xl font-medium transition-all hover:scale-105
        bg-emerald-400 hover:bg-emerald-300 text-white cursor-pointer"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center py-16 px-6">
        {features.map((item, index) => (
          <div key={index} className="space-y-2">
            <h2 className="font-bold text-lg text-emerald-600">{item.title}</h2>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <div className="relative md:sticky md:top-24 self-start">
            <div className="relative w-full h-155 flex items-center justify-center">
              <Image
                src="/assets/shoe1.png"
                alt="main"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />

              <div className="relative z-10 text-center text-white px-6">
                <h1 className="text-3xl md:text-4xl font-bold uppercase">
                  Shoe Care Valets
                </h1>

                <p className="mt-4 text-sm md:text-base text-white/90">
                  Curated shoe care kits designed for premium sneaker
                  maintenance. Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Id corporis rerum ullam saepe aperiam dolore
                  perspiciatis.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-white rounded-md overflow-hidden transition-all duration-200 shadow w-full border border-gray-100"
              >
                <div className="relative w-full h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt="Product"
                    fill
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />

                  <Image
                    src={product.hoverImage || product.image}
                    alt="Product hover"
                    fill
                    className="object-cover hover:scale-105 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className={`text-[10px] sm:text-xs font-medium px-3 py-1 rounded-xs ${BadgeStyles(
                        product.badge,
                      )}`}
                    >
                      {product.badge === "Best-Seller"
                        ? "Best Seller"
                        : product.badge === "Trending"
                          ? "Low Stock"
                          : ""}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex justify-between">
                    <h2 className="text-xm text-gray-400 mb-1">
                      {product.category}
                    </h2>
                  </div>

                  <div className="flex flex-col items-start gap-1 flex-wrap">
                    <p className="text-xs">{product.title}</p>

                    <p className="text-xs font-bold text-green-600">
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="flex justify-center flex-col items-center">
          <h1 className="tracking-tighter w-150 text-center text-7xl line-clamp-2 mb-4">
            About The Shoe Care Shop
          </h1>
          <p className="line-clamp-7 text-center w-150 text-xs m-10">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
            maiores, optio sequi excepturi cum fugit ex exercitationem, nam esse
            saepe adipisci ullam repellat vero dolores quis magnam dolor,
            mollitia quod! Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Deleniti maxime, aut iusto Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Debitis enim maiores ut vel mollitia
            ad, doloremque beatae architect excepturi eveniet, quisquam fuga
            quasi!
          </p>
        </div>

        <div className="m-8 grid grid-cols-2 gap-5">
          {guideCards.map((item, index) => (
            <div key={index} className="relative h-100 group overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-start p-8 text-white">
                <h1 className="text-2xl font-bold uppercase">{item.title}</h1>

                <p className="mt-2 text-sm font-medium">{item.desc1}</p>

                <p className="mt-2 text-xs text-white/80">{item.desc2}</p>

                <Link
                  href={item.link}
                  className="mt-4 inline-block bg-emerald-400 text-black px-5 py-2 rounded-md font-semibold hover:bg-emerald-300 transition"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
