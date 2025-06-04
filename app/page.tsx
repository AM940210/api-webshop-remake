"use client";

import ProductCard from "@/components/shop/ProductCard";

import { products as initialProducts } from "@/data";
import { useEffect, useState } from "react";
import Video from "../components/shop/Video";

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem("products");
        if (storedProducts && mounted) {
          const parsedProducts = JSON.parse(storedProducts);
          setProducts(parsedProducts);
        }
      } catch (error) {
        console.error("Failed to load products from localStorage:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "products" && event.newValue && mounted) {
        try {
          const parsedProducts = JSON.parse(event.newValue);
          setProducts(parsedProducts);
        } catch (error) {
          console.error("Failed to parse products from storage event:", error);
        }
      }
    };

    loadProducts();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mounted = false;
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gray-100 p-10 space-y-12">
      {/* Video-sektion med liten ikon */}
      <Video src="/assets/images/laptopvideo.mp4">
        {/* Text över videon */}
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30">
          <h1 className="text-white text-4xl font-bold px-4 sm:px-6 md:px-8">
            Welcome to our online store. Explore our products!
          </h1>
        </div>
      </Video>

      {/* Product Cards Section */}
      <section className="flex flex-wrap justify-center gap-16 max-w-7xl mx-auto">
        {products.map((product) => {
          // Ensure articleColorSize is always a string
          const safeProduct = {
            ...product,
            articleColorSize: product.articleColorSize ?? "",
          };
          return (
            <div key={product.id} className="bg-yellow-50 p-10">
              <ProductCard Product={safeProduct} />
            </div>
          );
        })}
      </section>
    </div>
  );
}
