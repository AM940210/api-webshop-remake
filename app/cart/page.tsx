"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/Cartcontext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0)
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <main>
      <div className="max-x-full mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>
        <div className="space-y-6">
          {items.map((Item) => (
            <div
              key={Item.id}
              className="flex flex-wrap md:flex-nowrap items-center gap-4 border rounded-md"
              data-cy="cart-item"
            >
              <div className="w-20 h-20 relative">
                {Item.image && (
                  <Image
                    src={Item.image}
                    alt={Item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium" data-cy="product-title">
                  {Item.title}
                </h3>
                <p className="text-gray-600" data-cy="">
                  {`${(Item.price * Item.quantity).toFixed(2)} kr`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(Item.id, Item.quantity - 1)}
                  data-cy="decrease-quantity-button"
                >
                  -
                </Button>
                <span data-cy="product-quantity">{Item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(Item.id, Item.quantity + 1)}
                  data-cy="increase-quantity-button"
                >
                  +
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(Item.id)}
                data-cy="remove-item-button"
              >
                🗑️
              </Button>
            </div>
          ))}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t pt-6">
            <div>
              <p className="text-lg font-medium" data-cy="total-price">
                Total: <span className="text-gray-600">{`${subtotal.toFixed(2)} kr`}</span>
              </p>
            </div>
            <Link
              href="/checkout"
              className="bg-black hover:bg-gray-600 text-white px-6 py-2 rounded-md mr-1 mb-12 font-semibold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
