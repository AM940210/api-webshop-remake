"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/Cartcontext";
import { products } from "@/data";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();

  const validItems = items.filter((item) =>
    products.some((p) => p.id === item.id)
  );

  const subtotal = validItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  if (validItems.length === 0)
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
          {validItems.map((Item) => {
            const product = products.find((p) => p.id === Item.id);

            return (
              <div
                key={Item.id}
                className="flex flex-wrap md:flex-nowrap items-center gap-4 border rounded-md"
                data-cy="cart-item"
              >
                <div className="w-20 h-20 relative">
                  {product && (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded"
                    />
                  )}
                </div>
                <div className="flex-1">
                  {product && (
                    <>
                      <h3 className="font-medium" data-cy="product-title">
                        {product.title}
                      </h3>
                      <p className="text-gray-600" data-cy="">
                        ${(product.price * Item.quantity).toFixed(2)}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(Number(Item.id), Item.quantity - 1)}
                    data-cy="decrease-quantity-button"
                  >
                    <ChevronDown size={16} />
                  </Button>
                  <span data-cy="product-quantity">{Item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(Number(Item.id), Item.quantity + 1)}
                    data-cy="increase-quantity-button"
                  >
                    <ChevronUp size={16} />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(Number(Item.id))}
                  data-cy="remove-item-button"
                >
                  <Trash size={18} className="text-red-500" />
                </Button>
              </div>
            );
          })}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t pt-6">
            <div>
              <p className="text-lg font-medium" data-cy="total-price">
                Total:{" "}
                <span className="text-gray-600">
                  {`$${subtotal.toFixed(2)}`}
                </span>
              </p>
            </div>
            <Link
              href="/checkout"
              className="bg-black hover:bg-gray-600 text-white px-6 py-2 rounded-md mr-1 font-semibold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
