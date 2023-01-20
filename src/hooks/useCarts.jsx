import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addOrUpdateCart,
  deleteAllCart,
  deleteCart,
  getCart,
} from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useCarts() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(["carts", uid || ""], () => getCart(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );

  const removeItem = useMutation((id) => deleteCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  const removeAllItem = useMutation(() => deleteAllCart(uid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem, removeAllItem };
}
