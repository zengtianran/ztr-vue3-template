<template>
  <div class="theme-module-wrap">
    <div class="theme-module-inner">
      <van-switch v-model="checked" @change="switchChange" />
      <h2>{{ theme }}</h2>
      <h3>{{ theme === "dark" ? "暗色主题" : "亮色主题" }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Switch, Button } from "vant";
import { useTheme } from "@/hooks/useTheme";
export default defineComponent({
  name: "Theme",
  components: {
    [Switch.name]: Switch,
    [Button.name]: Button
  },
  setup(props, context) {
    const { theme } = useTheme();
    const checked = ref(false);
    checked.value = theme.value === "dark" ? true : false;
    const switchChange = (val: any) => {
      console.log("switchChange :>> ", val);
      theme.value = val ? "dark" : "light";
    };
    return {
      checked,
      theme,
      switchChange
    };
  }
});
</script>

<style lang="scss" scoped>
.theme-module-wrap {
  background: var(--z-bg-color-2);
  height: 100vh;
  .theme-module-inner {
    h2 {
      color: var(--z-text-color);
      font-size: 28px;
    }
    h3 {
      color: var(--z-text-color);
      font-size: 30px;
    }
  }
}
</style>
