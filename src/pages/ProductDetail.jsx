import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCarts from "../hooks/useCarts";

export default function ProductDetail() {
  const {
    state: {
      product: { id, img, title, desc, price, color, size },
    },
  } = useLocation();

  const [option, setOption] = useState(size && size[0]);

  const { addOrUpdateItem } = useCarts();

  const handleClick = (e) => {
    const product = { id, img, title, price, color, size: option, quantity: 1 };
    addOrUpdateItem.mutate(product);
  };

  return (
    <section className="flex flex-col md:flex-row p-4">
      <div className="flex-1">
        <img className="h-96 mx-auto " src={img} alt="title" />
      </div>

      <div className="w-full flex flex-1 flex-col p-4">
        <h2 className="text-3xl font-bold py-2 ">{title}</h2>
        <p className="text-2xl font-bold py-2 border-b border-gray-400">{`${price}원`}</p>
        <p className="py-4 text-lg">{desc}</p>
        <p className="py-2 text-lg">{color}</p>
        <select
          className="p-2 my-4 border-2 border-dashed border-brand outline-none"
          onChange={(e) => setOption(e.target.value)}
        >
          {size &&
            size.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
        <Button text="장바구니 추가" onClick={handleClick} />
      </div>
    </section>
  );
}
