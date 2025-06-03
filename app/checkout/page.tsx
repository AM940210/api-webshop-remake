"use client";

import Checkout from "@/components/shop/checkout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/Cartcontext";
import { products } from "@/data";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const validItems = items.filter((item) =>
    products.some((p) => p.id === item.id)
  );

  const subtotal = validItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  return (
    <main>
      <div className="max-w-full mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>

        {validItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="mb-6 text-lg">Your cart is empty</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {validItems.map((item) => {
              const product = products.find((p) => p.id === item.id);

              return (
                <div
                  key={item.id}
                  className="flex flex-wrap md:flex-nowrap items-center gap-4 p-4 border rounded-md"
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
                        <p className="text-gray-600" data-cy="product-price">
                          ${(product.price * item.quantity).toFixed(2)}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(Number(item.id), item.quantity - 1)
                      }
                      data-cy="decrease-quantity-button"
                    >
                      <ChevronDown size={16} />
                    </Button>
                    <span data-cy="product-quantity">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(Number(item.id), item.quantity + 1)
                      }
                      data-cy="increase-quantity-button"
                    >
                      <ChevronUp size={16} />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(Number(item.id))}
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
            </div>
            <Checkout />
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
