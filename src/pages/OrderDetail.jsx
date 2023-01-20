import React from "react";
import { useLocation } from "react-router-dom";

export default function OrderDetail() {
  const {
    state: {
      orderItem: { products, amount, address },
    },
  } = useLocation();
  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        상세 주문내역
      </p>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center my-4 rounded-md border p-4"
          >
            <div className="w-32 sm:w-32 shrink-0 mr-4">
              <img
                className="object-cover h-32 sm:h-32 w-full "
                src={product.img}
              ></img>
            </div>
            <div className="flex flex-col sm:flex-row text-right">
              <span>{product.title}</span>
              <span className="mt-2 sm:mt-0 sm:ml-4">{product.price}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row pt-4 border-t border-gray-300">
        <div className="sm:w-3/4 rounded-md border m-2 p-3">
          <p className="text-xl mb-2">주소</p>
          <div>{address}</div>
        </div>
        <div className="sm:w-1/4 rounded-md border m-2 p-3">
          <p className="text-xl mb-2">총 가격</p>
          <div className="">{amount}</div>
        </div>
      </div>
    </section>
  );
}
