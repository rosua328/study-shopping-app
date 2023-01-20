import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct as addNewProduct,
  getProducts as fetchProducts,
} from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const getProducts = useQuery(["products"], fetchProducts);

  const addProduct = useMutation(
    ({ product, url, size }) => addNewProduct(product, url, size),
    { onSuccess: () => queryClient.invalidateQueries(["products"]) }
  );

  return { getProducts, addProduct };
}
