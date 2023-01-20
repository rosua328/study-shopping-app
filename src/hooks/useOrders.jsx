import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOrder, getOrder } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useOrders() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const orderQuery = useQuery(["orders", uid || ""], () => getOrder(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation((order) => addOrder(uid, order), {
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", uid]);
    },
  });

  return { orderQuery, addOrUpdateItem };
}
