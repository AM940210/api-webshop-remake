"use client";

import ProductCard from "@/components/shop/ProductCard";
import { products as initialProducts } from "@/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import Video from "../components/shop/Video";

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/product");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products from API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products
    .filter((p) => (p.title ?? "").toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) =>
      sortBy === "price"
        ? a.price - b.price
        : (a.title ?? "").localeCompare(b.title ?? "")
    );

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

      {/* Filter och sortering */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Sök produkt..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "price")}
          className="border p-2"
        >
          <option value="name">Sortera: Name</option>
          <option value="price">Sortera: Pris</option>
        </select>
      </div>

      {/* Product Cards Section */}
      <section className="flex flex-wrap justify-center gap-16 max-w-7xl mx-auto">
        {filteredProducts.map((product) => {
          const safeProduct = {
            ...product,
            articleColorSize: product.articleColorSize ?? "",
          };
          return (
            <Link
              key={product.id}
              href={`/product/${product.articleNumber}/${encodeURIComponent(
                product.title
              )}`}
              className="bg-yellow-50 p-10 block rounded hover:shadow-lg transition"
            >
              <ProductCard Product={safeProduct} />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
