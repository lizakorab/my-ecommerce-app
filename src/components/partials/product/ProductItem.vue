<template>
  <div
    class="product-item rounded shadow cursor-pointer flex flex-col items-center justify-center"
    @click="goToDetails"
  >
    <p class="product-item--title text-[28px] text-center mb-[8px] break-word">
      {{ product.name }}
    </p>
    <img :src="product.thumbnailUrl" />
    <span class="product-item--description text-center mt-[16px] break-word">{{
      product.shortDescription
    }}</span>

    <span
      v-if="cartStore.isProductInCart(product.id)"
      class="font-[18px] product-item--in-cart mt-[24px]"
    >
      Added to cart
    </span>
    <span
      v-else
      class="product-item--price mt-[24px] min-w-[130px] text-center"
      @mouseover="isPriceHovered = true"
      @mouseleave="isPriceHovered = false"
      @click.stop="addToCart"
    >
      <template v-if="!isPriceHovered">${{ product.price }}</template>
      <template v-else> + Add to cart</template>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Product } from "@/services/models/Product.model";
import { useRouter } from "vue-router";
import { RouteNames } from "@/routes";
import { useCartStore } from "@/stores/cartStore";

const props = defineProps<{
  product: Product | null;
}>();

const router = useRouter();

const cartStore = useCartStore();

const isPriceHovered = ref(false);
const addToCart = () => {
  cartStore.addToCart(props.product.id);
};

const goToDetails = () => {
  router.push({
    name: RouteNames.PRODUCT_DETAILS,
    params: { id: props.product.id },
  });
};
</script>

<style lang="scss" scoped>
.product-item {
  padding: 16px;
  background-color: $primary-color;
  transition: background-color 200ms ease;
  color: white;

  &:hover {
    background-color: $secondary-color;
  }

  &--price {
    font-weight: 600;
    border-radius: 50px;
    background: white;
    color: $secondary-color;
    padding: 8px 16px;
    box-shadow: 0 0 2px #ecd6d6, 0 0 11px #e31a5847, 0 0 6px #e9c9d3;
  }

  &--in-cart {
    font-weight: 600;
    padding: 8px 16px;
  }
}
</style>
