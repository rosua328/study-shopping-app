import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";

export default function FilterProducts({ sort, filter }) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);

  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    products &&
      setFilterProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, filter]);

  useEffect(() => {
    if (sort === "lowPrice") {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "highPrice") {
      setFilterProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products &&
          filterProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
