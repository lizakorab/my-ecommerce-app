import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const search = ref<string>("");

  const setSearch = (value: string) => {
    search.value = value;
  };

  return {
    search,
    setSearch,
  };
});
