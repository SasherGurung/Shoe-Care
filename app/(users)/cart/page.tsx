"use client";

import Image from "next/image";
import useCartStore from "@/lib/stores/Cart/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

export default function Cart() {
  const router = useRouter();

  const cart = useCartStore((state) => state.cart) || [];
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = cart.length > 0 ? 150 : 0;

  return (
    <section className="flex flex-col lg:flex-row justify-between py-20 px-8 gap-10 max-w-7xl mx-auto">
      <div className="w-full lg:w-2/3">
        <div className="flex items-center gap-1 text-gray-500">
          <Link href="/" className="transition hover:text-black">
            Home
          </Link>

          <IoIosArrowForward className="text-gray-400 w-4 `h-4" />

          <strong className="text-gray-800">Cart</strong>
        </div>
        <p className="text-4xl text-center font-bold mb-7">YOUR CART</p>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <MdRemoveShoppingCart className="w-14 h-14 text-gray-400" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>

            <p className="text-gray-500 max-w-md leading-relaxed mb-8">
              Looks like you havent added anything yet. Explore our premium
              footwear collection and find something you love.
            </p>

            <Link
              href="/products"
              className="bg-black text-white px-8 py-4 rounded-lg flex items-center gap-2 hover:scale-[1.02] transition duration-200"
            >
              Continue Shopping
              <FaArrowRightLong className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex border rounded-md overflow-hidden mb-3"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className="object-cover"
              />

              <div className="flex w-full justify-between">
                <div className="m-5">
                  <p className="text-xl font-bold">{item.title}</p>

                  <p className="mb-4">
                    Rs. {item.price.toLocaleString("en-IN")}
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-4 py-2 bg-gray-200 cursor-pointer"
                    >
                      -
                    </button>

                    <span className="font-bold">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-4 py-2 bg-gray-200 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="m-5">
                  <button onClick={() => removeFromCart(item.id)}>
                    <RiDeleteBin5Line className="h-6 w-5 cursor-pointer text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-full lg:w-1/2 border p-5 h-2/6 rounded-md space-y-2 sticky top-20">
        <p className="text-4xl font-bold mb-4">ORDER SUMMARY</p>

        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>Rs. {subtotal.toLocaleString("en-IN")}</p>
        </div>

        {cart.length > 0 && (
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>Rs. {shipping.toLocaleString("en-IN")}</p>
          </div>
        )}

        <div className="flex justify-between font-bold mt-4">
          <p>Total</p>
          <p>Rs. {(subtotal + shipping).toLocaleString("en-IN")}</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-black text-center">Promo Code</p>

          <input
            type="text"
            placeholder="Enter promo code"
            className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring- focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <button
          onClick={() => {
            if (cart.length === 0) {
              toast.error("Your cart is empty!");
              return;
            }
            router.push("/checkout");
          }}
          className="w-full mt-6 bg-black text-white py-4 rounded-lg cursor-pointer hover:scale-[1.01] transition-all duration-100 flex items-center gap-2 justify-center"
        >
          Go to Checkout{" "}
          <FaArrowRightLong className="w-4 h-4 relative top-0.5" />
        </button>

        <button
          onClick={clearCart}
          className="w-full mt-3 border py-3 bg-gray-50 rounded-lg cursor-pointer hover:scale-[1.01] transition-all duration-100 hover:bg-gray-100"
        >
          Clear Cart
        </button>
      </div>
    </section>
  );
}
