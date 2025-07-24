import { createRouter, createWebHistory } from "vue-router";
import { init } from "@/services/app";

export enum RouteNames {
  HOME = "HOME",
  PRODUCT_DETAILS = "PRODUCT_DETAILS",
  CART = "CART",
  NOT_FOUND = "NOT_FOUND",
}

export const routes = [
  {
    path: "/",
    name: RouteNames.HOME,
    component: () => import("@/components/views/Home.vue"),
  },
  {
    path: "/product/:id",
    name: RouteNames.PRODUCT_DETAILS,
    component: () => import("@/components/views/product/ProductDetails.vue"),
  },
  {
    path: "/cart",
    name: RouteNames.CART,
    component: () => import("@/components/views/Cart.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: RouteNames.NOT_FOUND,
    component: import("@/components/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (_, __, next) => {
  await init();
  next();
});

export default router;
