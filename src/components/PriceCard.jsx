import React from "react";

export default function PriceCard({ text, price }) {
  return (
    <div className="sm:text-xl sm:p-8 sm:w-auto mx-2 text-center text-lg w-full p-2 bg-gray-50">
      <p>{text}</p>
      <p className="font-bold text-brand text-xl md:text-2xl">{price}원</p>
    </div>
  );
}
