"use client";

import { z } from "zod";
import Delivery from "@/components/shop/Delivery";
import { useCart } from "@/contexts/Cartcontext";
import { useState } from "react";
import { checkoutFormSchema, type CheckoutFormData } from "@/lib/validations/checkout";

export default function Checkout() {
  const { items, clearCart } = useCart(); // Hämta cart items
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>> & { form?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    try {
      checkoutFormSchema.parse(formData);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        return formattedErrors;
      }
      return { form: "Validation failed" };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log("✅ Form valid, items:", items); // Debug

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            zipcode: formData.zipcode,
            city: formData.city,
            phone: formData.phone,
          },
          items: items.map((item) => ({
            title: item.title,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            articleNumber: item.articleNumber,
          })),
        }),
      });

      if (!res.ok) {
        console.error("Order creation failed", await res.text());
        return;
      }

      const order = await res.json();
      console.log("✅ Order created:", order);

      setIsSubmitted(true);
      clearCart(); // Töm varukorgen

      window.location.href = `/confirmation/${order.id}`; // Skicka till confirmation
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-x-2xl p-10">
        <h1 className="text-3xl font-semibold text-center mb-4">Checkout</h1>
        {items.length > 0 && (
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Order summary</h2>
            <ul className="text-sm mb-2">
              {items.map((item) => (
                <li key={item.id}>
                  {item.title} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="font-bold">
              Total: ${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </div>
          </div>
        )}
        {/* Lägg felmeddelande */}
        {errors.form && (
          <div className="mb-2 text-red-600 text-center">{errors.form}</div>
        )}
        <form data-cy="customer-form" onSubmit={handleSubmit} className="mt-4">
          <Delivery
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4"
          >
            Place Order
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-4 text-center text-green-600">
            Your order has been placed successfully!
          </div>
        )}
      </div>
    </div>
  );
}
