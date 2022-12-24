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
      className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
    >
      <img className="w-full" src={img} alt={title} />
      <div className="my-2 px-2 text-lg">
        <h3>{title}</h3>
        <p>{`${price}원`}</p>
      </div>
    </li>
  );
}
