// "use client";

// import Image from "next/image";
// import { MdDelete } from "react-icons/md";
// // import useCartStore from "../stores/CartStores";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
  
// export default function Cart() {
//   const router = useRouter();
// //   const cart = useCartStore((state) => state.cart) || [];
// //   const removeFromCart = useCartStore((state) => state.removeFromCart);
// //   const updateQuantity = useCartStore((state) => state.updateQuantity);

// //  const subtotal = cart.reduce(
// //   (sum, item) => sum + (item.price || 0) * item.quantity,
// //   0
// // );

// // const shipping = cart.length > 0 ? 15 : 0;

//   return (
//     <section className="flex flex-col lg:flex-row justify-between py-20 px-8 gap-10 mt-10 max-w-7xl mx-auto">
//       <div className="w-full lg:w-2/3">
//         <p className="text-5xl tracking-widest mb-2 font-bold">YOUR BAG</p>
//         <p className="tracking-tight text-[15px] text-gray-600 mb-6">
//           Items in your bag are not reserved. Check out now to make them yours.
//         </p>

//         {cart.length === 0 ? (
//           <p className="font-bold text-3xl text-center mt-10">
//             Your cart is empty.
//           </p>
//         ) : (
//           cart.map((item) => (
//             <div
//               key={item._id + "-" + item.selectedSize}
//               className="flex border rounded-md overflow-hidden mb-3"
//             >
//               {item.image && (
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   width={200}
//                   height={200}
//                   className="object-cover"
//                 />
//               )}

//               <div className="flex w-full justify-between">
//                 <div className="text-gray-700 m-5">
//                   <p className="text-xl font-bold mb-3">
//                     {item.title}
//                   </p>
//                   {item.selectedSize && (
//                     <p className="text-[16px] tracking-tight mb-1">
//                       Size: {item.selectedSize}
//                     </p>
//                   )}
//                   <p className="text-[16px] tracking-tight mb-4">
//                     Price: Rs. {item.price.toLocaleString("en-IN")}
//                   </p>
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() =>
//                         updateQuantity(item._id, item.selectedSize, item.quantity - 1)
//                       }
//                       disabled={item.quantity <= 1}
//                       className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
//                     >
//                       -
//                     </button>
//                     <span className="text-lg font-bold">{item.quantity}</span>
//                     <button
//                       onClick={() =>
//                         updateQuantity(item._id, item.selectedSize, item.quantity + 1)
//                       }
//                       className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex justify-center h-20 w-20 items-start mt-5">
//                   <button
//                     onClick={() => removeFromCart(item._id, item.selectedSize)}
//                   >
//                     <MdDelete
//                       width={25}
//                       height={25}
//                       className="cursor-pointer hover:scale-110 transition-transform duration-100" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="flex-col flex w-full lg:w-1/3 mt-10 lg:mt-0">
//         <p className="text-4xl tracking-wider mb-4 ml-3 font-bold">
//           ORDER SUMMARY
//         </p>
//         <div className="grid grid-cols-2">
//           <div className="ml-5 mt-3 text-gray-700">
//             <p>Sub Total</p>
//             {cart.length > 0 && <p>Shipping & Handling</p>}
//             <p className="mt-4 text-[20px] tracking-wider font-bold">
//               Final Total
//             </p>
//           </div>
//           <div className="flex flex-col items-end px-5 ml-5 mt-3">
//             <p>Rs. {(subtotal).toLocaleString('en-IN')}</p>
//             {cart.length > 0 && <p className="text-red-600">Rs. 150</p>}
//             <p className="mt-4 tracking-tight font-bold">
//               Rs. {(subtotal + shipping).toLocaleString('en-IN')}
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col mt-5 gap-4">
//           <button
//             onClick={() => {
//               if (cart.length === 0) {
//                 const notify = toast.error("Your cart is empty!");
//                 setTimeout(() => toast.dismiss(notify), 2000);
//                 return;
//               }
//               router.push("/checkout");
//             }}
//             className="flex justify-center border font-bold text-white bg-black py-5 rounded-4xl hover:bg-gray-300 hover:text-black cursor-pointer hover:scale-105 transition-transform duration-200"
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }