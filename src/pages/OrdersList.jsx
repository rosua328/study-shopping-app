import React from "react";
import OrderItem from "../components/OrderItem";
import useOrders from "../hooks/useOrders";

export default function OrdersList() {
  const {
    orderQuery: { isLoading, data: orders },
  } = useOrders();

  const hasOrders = orders && orders.length > 0;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        주문목록
      </p>
      {!hasOrders && <p>주문내역이 없습니다.</p>}
      {hasOrders && (
        <ul className="">
          {orders.map((orderItem) => (
            <OrderItem key={orderItem.id} orderItem={orderItem} />
          ))}
        </ul>
      )}
    </section>
  );
}
