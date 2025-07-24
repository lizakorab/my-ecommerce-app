import { defineStore } from "pinia";
import { computed, ref } from "vue";

// it may make sense to **persist** cart store 
export const useCartStore = defineStore("cart", () => {
  const productsInCart = ref<string[]>([]);

  const isProductInCart = (id: string) => productsInCart.value.includes(id);

  const addToCart = (id: string) => {
    if (!isProductInCart(id)) {
      productsInCart.value.push(id);
    }
  };

  const removeFromCart = (id: string) => {
    if (isProductInCart(id)) {
      productsInCart.value = productsInCart.value.filter(
        (productId: string) => productId !== id
      );
    }
  };

  return {
    productsInCartCount: computed(() => productsInCart.value.length),
    isProductInCart,
    addToCart,
    removeFromCart,
  };
});
