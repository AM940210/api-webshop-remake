import React from "react";
import { type CheckoutFormData } from "@/lib/validations/checkout";

interface DeliveryProps {
  formData: CheckoutFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
}

const Delivery: React.FC<DeliveryProps> = ({
  formData,
  handleChange,
  errors,
}) => {
  return (
    <div className="space-y-4 mt-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold">
          Name
        </label>
        <input
          data-cy="customer-name"
          placeholder="Donald Trump"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300"
          autoComplete="name"
        />
        {errors.name && (
          <p data-cy="customer-name-error" className="text-red-500 text-sm">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold">
          Email
        </label>
        <input
          data-cy="customer-email"
          placeholder="donald@trump.com"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300"
          autoComplete="email"
        />
        {errors.email && (
          <p data-cy="customer-email-error" className="text-red-500 text-sm">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold">
          Phone
        </label>
        <input
          data-cy="customer-phone"
          placeholder="031-123456"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300"
          autoComplete="tel"
        />
        {errors.phone && (
          <p data-cy="customer-phone-error" className="text-red-500 text-sm">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-semibold">
          Address
        </label>
        <input
          data-cy="customer-address"
          placeholder="Smart Street 123"
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300"
          autoComplete="street-address"
        />
        {errors.address && (
          <p data-cy="customer-address-error" className="text-red-500 text-sm">
            {errors.address}
          </p>
        )}
      </div>

      <div className="flex space-x-4">
        <div className="w-full">
          <label htmlFor="city" className="block text-sm font-semibold">
            City
          </label>
          <input
            data-cy="customer-city"
            placeholder="Brightville"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            autoComplete="address-level2"
          />
          {errors.city && (
            <p data-cy="customer-city-error" className="text-red-500 text-sm">
              {errors.city}
            </p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="zipcode" className="block text-sm font-semibold">
            Postal Code
          </label>
          <input
            data-cy="customer-zipcode"
            placeholder="23456"
            type="text"
            id="zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            autoComplete="postal-code"
          />
          {errors.zipcode && (
            <p
              data-cy="customer-zipcode-error"
              className="text-red-500 text-sm"
            >
              {errors.zipcode}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Delivery;
