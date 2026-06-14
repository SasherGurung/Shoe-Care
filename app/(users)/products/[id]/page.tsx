"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { SiTicktick } from "react-icons/si";
import useCartStore from "@/src/stores/cartStore";

type Product = {
  id: number;
  title: string;
  brand: string;
  images: string[];
  thumbnail: string;
  description: string;
  availabilityStatus: string;
  price: number;
  sku: string;
};

type LastAdded = {
  name: string;
  quantity: number;
};

export default function ProductsId() {
  const param = useParams();
  const id = param?.id as string;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<LastAdded | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`,
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const outOfStock = product?.availabilityStatus === "Out of Stock";

  const increase = () => {
    if (quantity < 15) setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const getTagStatus = (status: string) => {
    switch (status) {
      case "In Stock":
        return "text-green-500";
      case "Low Stock":
        return "text-blue-500";
      case "Out of Stock":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: String(product.id),
      title: product.title,
      price: product.price,
      image: product.images[0] || product.thumbnail,
      quantity,
    });

    setLastAdded({
      name: product.title,
      quantity,
    });

    setDialogOpen(true);
  };

  if (loading) {
    return (
      <p className="flex justify-center items-center min-h-screen font-bold text-2xl">
        Loading product...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="flex justify-center items-center min-h-screen font-bold text-2xl sm:text-3xl">
        Product not found!
      </p>
    );
  }

  const productImage = product.images[0] || product.thumbnail;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15 mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
        <div className="relative h-130 w-full rounded-2xl overflow-hidden shadow-lg cursor-pointer shadow-emerald-100">
          <Image
            src={productImage}
            alt={product.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <p className="text-gray-500 text-base">
            <strong className="text-black">Brand:</strong> {product.brand}
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            {product.title}
          </h1>

          <p className="text-lg font-semibold text-emerald-500">
            Rs. {product.price.toLocaleString("en-IN")}
          </p>

          <p className="text-gray-600 leading-relaxed text-base tracking-tight">
            {product.description}
          </p>

          <p className="text-base text-gray-500">
            <strong className="text-black">SKU:</strong> {product.sku}
          </p>

          <p
            className={`text-base ${getTagStatus(product.availabilityStatus)}`}
          >
            <strong>{product.availabilityStatus}</strong>
          </p>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={decrease}
              className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={increase}
              className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
            >
              +
            </button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className={`w-full py-2 rounded-lg font-bold text-lg transition-all duration-300 cursor-pointer
                ${
                  outOfStock
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-emerald-500 text-white hover:scale-[1.01] hover:bg-emerald-400"
                }`}
              >
                Add to Cart
              </button>

              <DialogContent className="max-w-md mx-auto rounded-xl border p-6 bg-white shadow-lg">
                <DialogHeader className="flex flex-col items-center text-center gap-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />

                  <DialogTitle className="text-xl font-bold text-gray-800">
                    Product Added to Cart!
                  </DialogTitle>

                  <DialogDescription className="text-gray-600 text-sm sm:text-base">
                    You have successfully added{" "}
                    <strong>{lastAdded?.name}</strong>
                    <br />
                    Quantity: <strong>{lastAdded?.quantity}</strong> |
                    Size:{" "}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                    onClick={() => router.push("/cart")}
                  >
                    View Cart
                  </button>

                  <button
                    className="px-6 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
                    onClick={() => router.push("/products")}
                  >
                    Continue
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col text-base text-gray-500 cursor-pointer">
            <p className="flex items-center gap-2 hover:scale-[1.01] transition-all duration-300">
              <SiTicktick className="text-emerald-500" />
              Personal advice via Email
            </p>

            <p className="flex items-center gap-2 hover:scale-[1.01] transition-all duration-300">
              <SiTicktick className="text-emerald-500" />
              Questions? Call us +31 20 2611 746
            </p>

            <p className="flex items-center gap-2 hover:scale-[1.01] transition-all duration-300">
              <SiTicktick className="text-emerald-500" />
              45 days return period
            </p>

            <p className="flex items-center gap-2 hover:scale-[1.01] transition-all duration-300">
              <SiTicktick className="text-emerald-500" />
              Daily fast shipping
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
