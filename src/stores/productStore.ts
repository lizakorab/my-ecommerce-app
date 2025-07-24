import { defineStore } from "pinia";
import type { Product } from "@/services/models/Product.model";
import ProductService from "@/services/api/Product.service";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await ProductService.getList();
      products.value = Array.isArray(response) ? response : [];
    } catch (e) {
      products.value = []
    } finally {
      loading.value = false;
    }
  };

  const getProductById = (id: string) =>
    products.value.find((product) => product.id === id) || null;

  return {
    products,
    loading,
    fetchProducts,
    getProductById,
  };
});
