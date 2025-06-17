"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z
    .string()
    .refine((val) => Number(val) > 0, "Price must be greater than 0"),
  image: z
    .string()
    .refine(
      (val) => z.string().url().safeParse(val).success,
      "Must be a valid URL"
    ),
  stock: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Stock must be a number"
    ),
});

export default function EditProductClient({
  articleNumber,
}: {
  articleNumber: string;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    stock: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/product/${articleNumber}`);
      if (!res.ok) {
        router.push("/admin");
        return;
      }

      const product = await res.json();
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        stock: product.stock?.toString() ?? "0",
      });
    };

    fetchProduct();
  }, [articleNumber, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = productSchema.parse(formData);
      const res = await fetch(`/api/product/${articleNumber}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) throw new Error("Update failed");

      router.push("/admin");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      } else {
        alert("Misslyckades att spara ändringar");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          data-cy="product-form"
        >
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              data-cy="product-title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {errors.title && (
              <p
                className="text-sm text-red-500 mt-1"
                data-cy="product-title-error"
              >
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              data-cy="product-description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            {errors.description && (
              <p
                className="text-sm text-red-500 mt-1"
                data-cy="product-description-error"
              >
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              data-cy="product-price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            {errors.price && (
              <p
                className="text-sm text-red-500 mt-1"
                data-cy="product-price-error"
              >
                {errors.price}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              data-cy="product-stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
            {errors.stock && (
              <p
                className="text-sm text-red-500 mt-1"
                data-cy="product-stock-error"
              >
                {errors.stock}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              data-cy="product-image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
            {errors.image && (
              <p
                className="text-sm text-red-500 mt-1"
                data-cy="product-image-error"
              >
                {errors.image}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <Button type="submit" variant="outline" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Link href="/admin">
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
