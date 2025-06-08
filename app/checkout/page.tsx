"use client";

import Checkout from "@/components/shop/checkout";

export default function CheckoutPage() {
  return (
    <main>
      <div className="max-w-2xl mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <Checkout />
      </div>
    </main>
  )
}