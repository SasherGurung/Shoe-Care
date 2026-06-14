"use client";

import Image from "next/image";
import useCartStore from "@/src/stores/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    <section className="flex flex-col lg:flex-row justify-between py-20 px-8 gap-10 mt-10 max-w-7xl mx-auto">
      <div className="w-full lg:w-2/3">
        <p className="text-5xl font-bold mb-2">YOUR BAG</p>

        {cart.length === 0 ? (
          <p className="text-3xl font-bold text-center mt-10">
            Your cart is empty.
          </p>
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
                    Price: Rs. {item.price.toLocaleString("en-IN")}
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-4 py-2 bg-gray-200"
                    >
                      -
                    </button>

                    <span className="font-bold">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-4 py-2 bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="m-5">
                  <button onClick={() => removeFromCart(item.id)}>
                    <RiDeleteBin6Line width={25} height={25} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-full lg:w-1/3">
        <p className="text-4xl font-bold mb-4">ORDER SUMMARY</p>

        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>Rs. {subtotal.toLocaleString("en-IN")}</p>
        </div>

        {cart.length > 0 && (
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Rs. {shipping.toLocaleString("en-IN")}</p>
          </div>
        )}

        <div className="flex justify-between font-bold mt-4">
          <p>Total</p>
          <p>Rs. {(subtotal + shipping).toLocaleString("en-IN")}</p>
        </div>

        <button
          onClick={() => {
            if (cart.length === 0) {
              toast.error("Your cart is empty!");
              return;
            }
            router.push("/checkout");
          }}
          className="w-full mt-6 bg-black text-white py-4 rounded"
        >
          Checkout
        </button>

        <button onClick={clearCart} className="w-full mt-3 border py-3">
          Clear Cart
        </button>
      </div>
    </section>
  );
}
