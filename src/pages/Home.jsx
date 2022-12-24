import React from "react";
import Products from "../components/Products";
import Banner from "../components/ui/Banner";

export default function Home() {
  return (
    <>
      <Banner />
      <ul>
        <li>FASHION FOR WINTER</li>
        <li>LAST 2022 Man</li>
        <li>SEASON SALE</li>
        <li>TRANDY FASHION FOR EVERY DAY</li>
      </ul>

      <div className="py-4 border-b border-gray-300">
        <p className="text-4xl mb-2 text-center font-bold ">대표 상품들</p>
        <p className="text-xl text-center ">
          우리 쇼핑몰의 대표 상품들을 확인하실 수 있어요.
        </p>
      </div>

      <Products />
    </>
  );
}
