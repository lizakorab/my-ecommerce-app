import { useProductStore } from "@/stores/productStore";

export const init = async () => {
  const productStore = useProductStore();
  await productStore.fetchProducts();
};
