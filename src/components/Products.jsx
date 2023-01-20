import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function Products() {
  const {
    getProducts: { isLoading, error, data: products },
  } = useProducts();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 sm:px-16 "> */}
      <ul className="grid grid-cols-layout justify-center gap-6 p-6 sm:px-16 ">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
