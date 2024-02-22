import { ref, watchEffect } from "vue";

type ITheme = "dark" | "light";

const STORE_KEY = "__theme__";

const theme = ref<ITheme>((localStorage.getItem(STORE_KEY) as ITheme) || "light");

watchEffect(() => {
  // 设置根html属性
  document.documentElement.dataset.theme = theme.value;
  localStorage.setItem(STORE_KEY, theme.value);
});

export function useTheme() {
  return {
    theme
  };
}
