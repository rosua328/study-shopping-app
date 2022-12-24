import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import PriceCard from "../components/PriceCard";
import Button from "../components/ui/Button";
const DELIVERY = 3000;
export default function Cart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));

  if (isLoading) return <p>Loading....</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice = Array.isArray(products)
    ? products.reduce(
        (prev, current) => prev + parseInt(current.price) * current.quantity,
        0
      )
    : 0;

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        내 장바구니
      </p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 px-2 sm:px-16 ">
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="배송액" price={DELIVERY} />
            <FaEquals className="shrink-0" />
            <PriceCard text="총가격" price={totalPrice + DELIVERY} />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
}
