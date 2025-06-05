"use client";

import React from "react";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { Button } from "@/components/ui/button";
import { products as initialProducts } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductDetailPage({ params }: {params: Promise<{ id: string; title: string }> }) {
  const { id, title } = React.use(params);

  const [product, setProduct] = useState(() =>
    initialProducts.find((p) => p.articleNumber === id)
  );

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        const foundProduct = products.find(
          (p: any) => p.articleNumber === id
        );
        if (foundProduct) {
          setProduct(foundProduct);
        }
      }
    } catch (error) {
      console.error("Failed to load product from localStorage:", error);
    }
  }, [id]);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* Responsivt kort */}
      <div className="w-full max-w-4xl bg-yellow-50 rounded-xl shadow-lg p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Responsiv bild */}
        <div className="w-full flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.title}
            width={300} // Mindre bild på mobil
            height={300}
            className="rounded-lg object-contain max-h-[300px] w-auto h-auto"
          />
        </div>

        {/* Text och knappar */}
        <div className="flex flex-col justify-between h-full space-y-4">
          <div>
            <h1
              data-cy="product-title"
              className="text-2xl md:text-3xl font-bold"
            >
              {product.title}
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-1">
              {product.articleColorSize}
            </p>

            <p
              data-cy="product-description"
              className="mt-6 text-gray-700 leading-relaxed text-sm md:text-base"
            >
              {product.description}
            </p>

            <p
              data-cy="product-price"
              className="mt-8 text-xl md:text-2xl font-semibold"
            >
              {product.price} kr
            </p>
          </div>

          {/* Knappar */}
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 mt-6">
            <Button
              asChild
              className="px-8 py-2 bg-pink-400 hover:bg-pink-500 text-black rounded-full w-full md:w-auto"
            >
              <Link href="/">Back</Link>
            </Button>
            <AddToCartButton
              product={{
                ...product,
                articleColorSize: product.articleColorSize ?? ""
              }}
              className="flex items-center justify-center px-4 py-1 bg-pink-400 hover:bg-pink-500 text-black rounded-full"
              data-cy="product-buy-button"
            >
              Buy
            </AddToCartButton>
          </div>
        </div>
      </div>
    </div>
  );
}
