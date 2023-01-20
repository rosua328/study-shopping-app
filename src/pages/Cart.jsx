import React from "react";
import CartItem from "../components/CartItem";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import PriceCard from "../components/PriceCard";
import Button from "../components/ui/Button";
import useCarts from "../hooks/useCarts";
import { v4 as uuid } from "uuid";
import useOrders from "../hooks/useOrders";
import { useNavigate } from "react-router-dom";
const DELIVERY = 3000;

export default function Cart() {
  const {
    cartQuery: { isLoading, data: products },
    removeAllItem,
  } = useCarts();

  const { addOrUpdateItem } = useOrders();

  const navigate = useNavigate();

  if (isLoading) return <p>Loading....</p>;

  const hasProducts = products && products.length > 0;

  const totalPrice = Array.isArray(products)
    ? products.reduce(
        (prev, current) => prev + parseInt(current.price) * current.quantity,
        0
      )
    : 0;

  const handlePayment = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateString = year + "-" + month + "-" + day;

    const order = {
      id: uuid(),
      amount: totalPrice + DELIVERY,
      address: "경기도 수원시 권선구",
      delivery: false,
      products,
      createdAt: dateString,
    };

    try {
      addOrUpdateItem.mutate(order);
      removeAllItem.mutate();
      navigate(`/success`, { state: { orderItem: order } });
    } catch (err) {}
  };

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
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 px-2 sm:px-16 ">
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="배송액" price={DELIVERY} />
            <FaEquals className="shrink-0" />
            <PriceCard text="총가격" price={totalPrice + DELIVERY} />
          </div>
          <Button onClick={handlePayment} text="주문하기" />
        </>
      )}
    </section>
  );
}
