import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderItem({ orderItem, orderItem: { products, id } }) {
  const navigate = useNavigate();

  return (
    <li
      className="flex justify-between items-center cursor-pointer my-4 rounded-md border p-4"
      onClick={() => {
        navigate(`/order/${id}`, { state: { orderItem } });
      }}
    >
      <div className="w-32 sm:w-32 shrink-0 mr-4">
        <img
          className="object-cover h-32 sm:h-32 w-full "
          src={products[0].img}
        ></img>
      </div>
      <div className="flex flex-col sm:flex-row text-right ">
        <p className="font-semibold">
          {products[0].title} 외 {products.length - 1}개
        </p>
        <p className="mt-2 sm:mt-0 sm:ml-4">준비중</p>
      </div>
    </li>
  );
}
