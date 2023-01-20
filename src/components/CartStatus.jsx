import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCarts from "../hooks/useCarts";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCarts();

  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-2xl" />
      {products && (
        <p className="flex items-center justify-center w-4 h-4  bg-brand text-white font-bold rounded-full absolute -top-1 -right-1">
          {products.length}
        </p>
      )}
    </div>
  );
}
