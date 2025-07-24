<template>
  <div
    class="product-details flex flex-col justify-center p-[12px] md:p-[48px]"
  >
    <Button
      label="Go back to products"
      severity="secondary"
      class="max-w-[150px] md:mt-[-20px]"
      rounded
      variant="outlined"
      size="small"
      @click="goBack"
    />
    <div v-if="product" class="flex flex-col items-center mt-[24px]">
      <span class="text-[32px] mb-[24px]"> {{ product.name }}</span>

      <div class="flex flex-col md:flex-row">
        <div>
          <img
            class="min-w-[90vw] md:min-w-[40vw]"
            :src="product.thumbnailUrl"
          />
        </div>
        <div class="flex flex-col justify-start md:ml-[48px]">
          <span>Category: {{ product.category }}</span>
          <span>{{ product.shortDescription }}</span>

          <span class="mt-[16px]">${{ product.price }}</span>

          <Button
            v-if="!cartStore.isProductInCart(product.id)"
            label="Add to cart"
            severity="contrast"
            class="mt-[20px]"
            rounded
            size="small"
            @click="addToCart"
          />
          <template v-else>
            <b class="mt-[16px]">Added to cart</b>
            <Button
              label="Remove from cart"
              severity="secondary"
              class="mt-[20px]"
              rounded
              size="small"
              @click="removeFromCart"
            />
          </template>
        </div>
      </div>

      <div class="mt-[32px]">{{ product.longDescription }}</div>

      <div class="flex flex-col w-[100%]">
        <div class="mt-[32px] text-start text-[24px]">Reviews</div>

        <div
          v-for="review in product.reviews"
          :key="review.id"
          class="mt-[12px]"
        >
          <b class="font-[29px]">{{ review.username }}</b>
          <label class="italic"> said:</label><br />
          <span>"{{ review.comment }}"</span>
        </div>

        <span class="italic" v-if="!product.reviews.length"
          >No reviews yet.</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RouteNames } from "@/routes";
import Button from "primevue/button";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";

const route = useRoute();
const router = useRouter();

const product = ref(null);
const productStore = useProductStore();
const cartStore = useCartStore();

onBeforeMount(async () => {
  const id = route.params.id;
  const item = toRaw(productStore.getProductById(id));

  if (!item) {
    router.push({ name: RouteNames.NOT_FOUND });
    return;
  }

  product.value = item;
});

const goBack = () => {
  router.push({ name: RouteNames.HOME });
};

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value.id);
  }
};

const removeFromCart = () => {
  if (product.value) {
    cartStore.removeFromCart(product.value.id);
  }
};
</script>

<style lang="scss" scoped>
.product-details {
}
</style>
