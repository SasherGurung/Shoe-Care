"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TbTruckDelivery } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import useCartStore from "@/lib/stores/Cart/cartStore";
import { MdRemoveShoppingCart } from "react-icons/md";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/lib/supabase";
import { useRouter } from "next/navigation";

function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingMethod, setShippingMethod ] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCity("");
    setPostalCode("");
    setShippingMethod("");
    setPaymentMethod("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !city || !postalCode || !shippingMethod ) {
      toast.error("Please fill all the required fields")
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("checkout_details").insert({
        full_Name: fullName,
        email,
        phone,
        city,
        postal_Code: postalCode,
        shipping_Method: shippingMethod,
        payment_Method: paymentMethod,
      });

      if (error) {
        toast.error(error.message)
        return;
      };
      
      toast.success("Order Placed Successfully");
      router.push("/cart");

      resetForm();
      clearCart();
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = cart.length > 0 ? 150 : 0;
  const discount = subtotal >= 2000 ? 500 : 0;
  const total = subtotal + shipping - discount;

  return (
    <section className="min-h-screen py-10 px-6 lg:px-20 bg-gray-50">
      <h1 className="text-left ml-10 text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-[50%_50%] gap-8">
          <div className="space-y-8">
            <div className="bg-white border rounded-xl py-10 px-15">
              <h2 className="text-xl font-semibold mb-6">
                Shipping Information
              </h2>
              <div className="flex gap-5 ">
                <label className="flex items-center justify-center gap-2 border focus-ring-1 focus:ring-emerald-500 w-full py-3 rounded-xl cursor-pointer">
                  <input type="radio" name="shippingMethod" value="Delivery" checked={shippingMethod === "Delivery"} onChange={(e) => setShippingMethod(e.target.value)} />
                  <TbTruckDelivery /> Delivery
                </label>

                <label className="flex items-center justify-center gap-2 border focus-ring-1 focus:ring-emerald-500 w-full py-3 rounded-xl cursor-pointer">
                  <input type="radio" name="shippingMethod" value="Pick up" checked={shippingMethod === "Pick up"} onChange={(e) => setShippingMethod(e.target.value)} />
                  <FiBox /> Pick Up
                </label>
              </div>
              <div className="flex flex-col gap-3">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                    className="w-full border rounded-lg p-2 outline-none mt-1 focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full border rounded-lg p-2 outline-none mt-1 focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    inputMode="numeric"
                    className="w-full border rounded-lg p-2 outline-none mt-1 focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-3 flex justify-between">
                  <div>
                    <label htmlFor="city" className="font-medium">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                      className="w-full border rounded-lg p-2 outline-none mt-1 focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="zip" className="font-medium">
                      ZIP Code
                    </label>
                    <input
                      id="zip"
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Postal Code"
                      className="w-full border rounded-lg p-2 outline-none mt-1 focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

              <div className="flex justify-evenly gap-5">
                <label className="w-full flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
                  <input type="radio" name="payment" value=
                  "Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <span>Cash on Delivery</span>
                </label>

                <label className="w-full flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
                  <input type="radio" name="payment" value="eSewa" checked={paymentMethod === "eSewa"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <span>eSewa</span>
                </label>

                <label className="w-full flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
                  <input type="radio" name="payment" value="Khalti" checked={paymentMethod === "Khalti"} onChange={(e) => setPaymentMethod(e.target.value)}/>
                  <span>Khalti</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white border rounded-xl py-10 px-15 sticky top-20">
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold">Review Your Cart</h1>

                <div className="flex flex-col gap-3 justify-between border rounded-xl p-2 px-4 mb-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                        <MdRemoveShoppingCart className="w-14 h-14 text-gray-400" />
                      </div>

                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Your cart is empty
                      </h2>

                      <p className="text-gray-500 max-w-md leading-relaxed mb-8">
                        Looks like you havent added anything yet. Explore our
                        premium footwear collection and find something you love.
                      </p>
                    </div>
                  ) : (
                    cart.map((items) => (
                      <div key={items.id} className="flex items-center gap-4">
                        <Image
                          src={items.image}
                          alt={items.title}
                          width={90}
                          height={90}
                          priority
                          className="rounded-lg object-cover"
                        />

                        <div className="flex flex-col gap-1">
                          <p className="font-medium">{items.title}</p>

                          <p className="text-sm text-gray-500">
                            Quantity: {items.quantity}x
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>Rs. {shipping.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>- Rs. {discount}</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button disabled={loading} className="w-full mt-6 bg-emerald-400 hover:bg-emerald-500 cursor-pointer flex justify-center items-center text-white py-3 rounded-lg hover:opacity-90 transition">
                {loading ? "Placing Order.." : "Place Order"}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Secure checkout powered by ShoeCare
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CheckoutPage;
