"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

type FormErrors = {
  [key: string]: string[];
};

export default function AdminProductForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    setIsButtonActive(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = productSchema.parse(formData);

      const newProduct: Product = {
        id: Date.now().toString(),
        articleNumber: `A${Math.floor(1000 + Math.random() * 9000)}`,
        title: validatedData.title,
        description: validatedData.description,
        price: Number(validatedData.price),
        image: validatedData.image,
        articleColorSize: "",
      };

      let existingProducts: Product[] = [];
      const storedProducts = localStorage.getItem("products");

      if (storedProducts) {
        existingProducts = JSON.parse(storedProducts);
      }

      const updatedProducts = [...existingProducts, newProduct];

      localStorage.setItem("products", JSON.stringify(updatedProducts));

      window.dispatchEvent(new Event("storage"));

      router.push("/admin");
      router.refresh();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as FormErrors);
      } else {
        console.error("Error saving product:", error);
        alert("Failed to save product. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl mx-auto p-4 pt-24 relative z-10"
      data-cy="product-form"
    >
      <div>
        <Label htmlFor="title">Product Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? "border-red-500" : ""}
          data-cy="product-title"
        />
        {errors.title?.map((error) => (
          <p
            key={error}
            className="text-red-500 text-sm mt-1"
            data-cy="product-title-error"
          >
            {error}
          </p>
        ))}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? "border-red-500" : ""}
          data-cy="product-description"
        />
        {errors.description?.map((error) => (
          <p
            key={error}
            className="text-red-500 text-sm mt-1"
            data-cy="product-description-error"
          >
            {error}
          </p>
        ))}
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          className={errors.price ? "border-red-500" : ""}
          data-cy="product-price"
        />
        {errors.price?.map((error) => (
          <p
            key={error}
            className="text-red-500 text-sm mt-1"
            data-cy="product-price-error"
          >
            {error}
          </p>
        ))}
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={errors.image ? "border-red-500" : ""}
          data-cy="product-image"
        />
        {errors.image?.map((error) => (
          <p
            key={error}
            className="text-red-500 text-sm mt-1"
            data-cy="product-image-error"
          >
            {error}
          </p>
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          className={`flex-1 ${isButtonActive ? "active" : ""}`}
          disabled={isSubmitting}
          data-cy="add-product-submit"
          onClick={handleButtonClick}
        >
          {isSubmitting ? "Saving..." : "Add Product"}
        </Button>

        <Link href="/admin">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            data-cy="cancel-product"
          >
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
