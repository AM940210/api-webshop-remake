"use client";

import { useCart } from "@/contexts/Cartcontext";

const ShoppingCart = () => {
  const { totalItems } = useCart();

  return (
    <div className="relative ">
      <img className="w-7" src="/assets/images/cart.png" alt="Shopping Cart" />
      {totalItems >= 0 && (
        <div
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs "
         data-cy="cart-items-count-badge"
        >
          {totalItems}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
