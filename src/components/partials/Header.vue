<template>
  <Menubar class="header">
    <template #start>
      <img
        src="@/assets/logo.png"
        class="header--logo cursor-pointer"
        @click="goToHome"
      />
    </template>
    <template #end>
      <div class="flex items-center">
        <IconField v-if="isSearchShown">
          <InputIcon class="pi pi-search" />
          <!-- if we would do search fetching data each time, it makes sense to add debounce to pinia's action -->
          <InputText
            size="small"
            severity="contrast"
            :value="appStore.search"
            placeholder="Search"
            @value-change="appStore.setSearch"
          />
        </IconField>
        <div
          class="header--cart ml-[12px] md:ml-[36px] mr-[8px] cursor-pointer"
        >
          <i
            class="pi pi-shopping-cart"
            style="color: 'var(--p-primary-color)'"
          />
          <span
            v-if="cartStore.productsInCartCount > 0"
            class="header--cart--count"
            >{{ cartStore.productsInCartCount }}</span
          >
        </div>
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Menubar from "primevue/menubar";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { RouteNames } from "@/routes";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/appStore";
import { useCartStore } from "@/stores/cartStore";

const router = useRouter();
const route = useRoute();

const appStore = useAppStore();
const cartStore = useCartStore();

const isSearchShown = computed(() => route.name === RouteNames.HOME);

const goToHome = () => {
  router.push({ name: RouteNames.HOME });
};
</script>

<style lang="scss" scoped>
$p-content-border-radius: 0;

.header {
  width: 100%;
  &--logo {
    max-width: 100px;
    width: 10vw;
  }

  &--cart {
    &--count {
      position: absolute;
      font-size: 12px;
      top: 16px;
      right: 12px;
      background-color: $secondary-color;
      padding: 0 2px;
      width: 15px;
      height: 15px;
      text-align: center;
      line-height: 15px;
      border-radius: 9999px;
      color: white;
    }
  }
}
</style>
