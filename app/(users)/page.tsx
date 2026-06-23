"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import { lavishly } from "../fonts";

type Products = {
  id: string;
  images: string[];
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
};

function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.log(error);
        return;
      }

      setProducts(data || []);
    };

    getAllProducts();
  }, []);

  const features = [
    {
      title: "FREE SHIPPING",
      description: "Free shipping on orders above Rs. 500",
    },
    {
      title: "45 DAYS RETURN",
      description: "Simply return it within 45 days for exchange or refund",
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

  const guideCards = [
    {
      image: "/assets/shoe.png",
      title: "About Our Shoe Care",
      desc1: "We believe quality footwear deserves long-lasting care.",
      desc2:
        "Learn who we are, what we do, and why proper shoe maintenance matters for durability and style.",
      link: "/about",
      buttonText: "Learn About Us",
    },
    {
      image: "/assets/shoe1.png",
      title: "Contact & Support",
      desc1: "Need help with your shoe care products?",
      desc2:
        "Reach out to our support team for guidance, product questions, or care recommendations.",
      link: "/contact",
      buttonText: "Contact Us",
    },
  ];

  const limitedProduct = products.slice(0, 6);

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <Link href="/products" className="cursor-default">
        <section className="relative w-full h-screen overflow-hidden bg-black">
          <div className="absolute inset-0">
            <div className="relative w-full h-screen">
              <Image
                src="/assets/home2.png"
                alt="Hero sneaker"
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>

          <div className="absolute inset-0 " />

          <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
            <div className="space-y-5">
              <h1
                className={`text-white font-bold tracking-wide text-6xl ${lavishly.className}`}
              >
                Premium Sneaker Care Studio
              </h1>

              <p className="text-white text-xm line-clamp-3 w-2xl">
                Luxury sneaker care products designed to keep your shoes fresh
                and protected. Not only do we sell these products, but we also
                use them ourselves every day.
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
      </Link>

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
            {limitedProduct.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-xl">
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
                  </div>

                  <div className="p-5">
                    <h2 className="text-sm text-gray-400 mb-1">
                      {product.category}
                    </h2>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">{product.title}</p>

                      <p className="text-xs text-gray-500 line-clamp-2">
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
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="flex justify-center flex-col items-center">
          <h1 className="tracking-tighter w-150 text-center text-7xl line-clamp-2 mb-4">
            About The Shoe Care Shop
          </h1>
          <p className="line-clamp-7 text-center w-150 text-base m-10">
          At ShoeCare, we believe that every pair of shoes deserves proper care and attention. Shoes are more than just accessories — they are part of your lifestyle, personality, and daily journey. Our goal is to help you keep your favorite footwear clean, protected, and looking fresh for longer.
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
                  className="mt-4 inline-block bg-emerald-400 text-white px-5 py-2 rounded-md font-semibold hover:bg-emerald-300 transition"
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
