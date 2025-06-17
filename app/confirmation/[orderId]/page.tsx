import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function Page({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) return <main>404 - Order not found</main>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 overflow-auto">
      <div className="bg-[rgb(255,251,230)] shadow-lg rounded-lg p-6 max-w-screen-lg text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Confirmation</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Thank you for shopping with us!
        </h2>

        <div className="text-left grid grid-cols-2 grid-rows-3 gap-2 border-2 border-black rounded-md p-2">
          <p>Order reference:</p>
          <p className="text-right">{order.id}</p>
          <p>Order date:</p>
          <p className="text-right">{order.createdAt.toLocaleString()}</p>
          <p>Payment method:</p>
          <p className="text-right">Visa - **** 1234</p>
        </div>

        <h3 className="m-4 font-bold">Order Summary</h3>
        <div className="text-left grid grid-cols-3 border-2 border-black rounded-md gap-2 p-2">
          <p className="font-bold">Product</p>
          <p className="font-bold text-center">Quantity</p>
          <p className="font-bold text-right">Price</p>

          {order.items.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center gap-2">
                <img
                  src={item.image ?? "/fallback.jpg"}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <span>{item.title}</span>
              </div>
              <p className="text-center">{item.quantity}</p>
              <p className="text-right">
                {(item.price * item.quantity).toFixed(2)} kr
              </p>
            </React.Fragment>
          ))}

          {/* Totalsumma */}
          <p className="font-bold">Total (incl. taxes & shipping)</p>
          <p></p>
          <p className="text-right font-bold">
            {order.items
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}{" "}
            kr
          </p>
        </div>

        <h3 className="m-4 font-bold">Personal Information</h3>
        <div className="text-left grid grid-cols-2 grid-rows-6 gap-2 border-2 border-black rounded-md p-2">
          <p>Name:</p>
          <p className="text-right">{order.customerName}</p>
          <p>Address:</p>
          <p className="text-right">{order.customerAddress}</p>
          <p>Zip code:</p>
          <p className="text-right">{order.customerZipcode}</p>
          <p>City:</p>
          <p className="text-right">{order.customerCity}</p>
          <p>Phone:</p>
          <p className="text-right">{order.customerPhone}</p>
          <p>E-mail:</p>
          <p className="text-right">{order.customerEmail}</p>
        </div>

        <h3 className="m-4 font-bold">Shipping Information</h3>
        <div className="text-left grid grid-cols-2 grid-rows-2 gap-2 border-2 border-black rounded-md p-2">
          <p>Estimated Delivery:</p>
          <p className="text-right">3–5 working days</p>
          <p>Shipping Method:</p>
          <p className="text-right">PostNord</p>
        </div>

        <h3 className="mt-4 font-bold">Return & Support Information</h3>
        <div className="text-left gap-2 border-2 border-black rounded-md mt-4 p-2">
          <p>30-day return policy</p>
        </div>

        <h3 className="m-4 font-bold">Contact</h3>
        <div className="text-left grid grid-cols-2 grid-rows-2 gap-2 border-2 border-black rounded-md p-2">
          <p>Telephone:</p>
          <p className="text-right">+46 (0)31 12 34 56</p>
          <p>E-mail:</p>
          <p className="text-right">info@mast.se</p>
        </div>

        <div className="text-left grid grid-cols-1 grid-rows-2 gap-2 border-2 border-black rounded-md mt-4 p-2">
          <p>A confirmation has been sent to:</p>
          <p className="text-left">{order.customerEmail}</p>
        </div>

        <Link href="/">
          <Button className="bg-[rgb(233,126,207)] text-white text-1xl hover:bg-[rgb(235,172,219)] transition mt-4">
            Continue shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
