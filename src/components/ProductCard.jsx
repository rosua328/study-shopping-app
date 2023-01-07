import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  product: { id, img, title, price },
}) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/product/${id}`, { state: { product } });
      }}
      className="w-80 shadow-lg overflow-hidden cursor-pointer transition-all hover:scale-105 pt-10"
    >
      <img className="w-full h-80 object-cover" src={img} alt={title} />
      <div className="my-2 mt-6 px-2 text-lg">
        <h3 className="font-bold">{title}</h3>
        <p>{`${price}`}</p>
      </div> 
    </li>
  );
}
