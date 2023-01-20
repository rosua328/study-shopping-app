import React from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useCarts from "../hooks/useCarts";

const CSSCLASS =
  "transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1";

export default function CartItem({
  product,
  product: { id, img, title, size, price, quantity },
}) {
  const { addOrUpdateItem, removeItem } = useCarts();
  const handlePlus = () => {
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  };

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };

  const handleDelete = () => {
    removeItem.mutate(id);
  };

  return (
    <li className="flex justify-between my-2 items-center">
      <img className="sm:w-48 w-24 rounded-lg" src={img} alt={title} />
      <div className="flex sm:flex-1 justify-between ml-4 flex-col sm:flex-row">
        <div className="">
          <p className="text-lg">{title}</p>
          <p>{size}</p>
          <p>{price}원 </p>
        </div>
        <div className="text-2xl flex items-center">
          <AiFillMinusSquare className={CSSCLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiFillPlusSquare className={CSSCLASS} onClick={handlePlus} />
          <RiDeleteBin5Fill className={CSSCLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
