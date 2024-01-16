import { ref } from "vue";

export const useToggle = () => {
  const state = ref(false);
  const toggle = () => {};

  return {
    state,
    toggle
  };
};
