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
  image: z.string().refine((val) => {
    return z.string().url().safeParse(val).success;
  }, "Must be a valid URL"),
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
  });

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    price?: string;
    image?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const product = products.find(
        (p: any) => p.articleNumber === articleNumber
      );

      if (product) {
        setFormData({
          title: product.title,
          description: product.description,
          price: product.price.toString(),
          image: product.image,
        });
      } else {
        console.error(`Product with articleNumber ${articleNumber} not found`);
        router.push("/admin");
      }
    }
  }, [articleNumber, router]);

  const validateForm = () => {
    try {
      productSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        console.log("Validation errors:", newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting form with data:", formData);

    if (!validateForm()) {
      console.log("Form validation failed, errors:", errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const storedProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      const updatedProducts = storedProducts.map((product: any) => {
        if (product.articleNumber === articleNumber) {
          return {
            ...product,
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            image: formData.image,
          };
        }
        return product;
      });

      localStorage.setItem("products", JSON.stringify(updatedProducts));
      window.dispatchEvent(new Event("storage"));
      router.push("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
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
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
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
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
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
              type="number"
              data-cy="product-price"
              name="price"
              value={formData.price}
              onChange={(e) => {
                setFormData({ ...formData, price: e.target.value });
              }}
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
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              data-cy="product-image"
              value={formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
              }}
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
            <Button
              type="submit"
              variant="outline"
              data-cy="admin-add-product"
              disabled={isSubmitting}
            >
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
