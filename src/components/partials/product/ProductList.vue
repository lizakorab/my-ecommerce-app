<template>
  <div class="product-list">
    <div
      class="product-list--ad flex justify-center items-center flex-col text-center text-[36px] md:text-6xl h-[14vh] md:h-[40vh]"
    >
      Check our offers
      <br />
      <i
        class="pi pi-arrow-down mt-[16px] md:mt-[32px]"
        style="font-size: 1.7rem"
      />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:gap-8 md:p-8"
    >
      <ProductItem
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />

      <span v-if="!filteredProducts.length" class="italic"
        >No products found.</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ProductItem from "@/components/partials/product/ProductItem.vue";
import { useProductStore } from "@/stores/productStore";
import { useAppStore } from "@/stores/appStore";

const productStore = useProductStore();
const appStore = useAppStore();

const filteredProducts = computed(() => {
  if (!appStore.search) {
    return productStore.products;
  }

  return productStore.products.filter((product) =>
    product.name.toLowerCase().includes(appStore.search.toLowerCase())
  );
});
</script>

<style lang="scss" scoped>
.product-list {
  &--ad {
    background-color: #4c50ac0f;
    color: $secondary-color;
    font-weight: 400;
    letter-spacing: 2.5px;
    text-shadow: 0 0 32px #ecd6d6, 0 0 21px #e31a5847, 0 0 32px #e9c9d3;
  }
}
</style>
