<template>
  <div class="theme-module-wrap">
    <div class="theme-module-inner">
      <van-switch v-model="checked" @change="switchChange" />
      <h2>{{ theme }}</h2>
      <h3>{{ theme === "dark" ? "暗色主题" : "亮色主题" }}</h3>
      <h3>Fetch Event 加载流式数据</h3>
      <div class="contain" v-html="printTxt"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Switch, Button } from "vant";
import { useTheme } from "@/hooks/useTheme";
import { useSse } from "./fetchSse";
export default defineComponent({
  name: "Theme",
  components: {
    [Switch.name]: Switch,
    [Button.name]: Button
  },
  setup(props, context) {
    const { theme } = useTheme();
    const { fetchEventSource } = useSse();
    const checked = ref(false);
    const printTxt = ref("");
    checked.value = theme.value === "dark" ? true : false;
    const switchChange = (val: any) => {
      console.log("switchChange :>> ", val);
      theme.value = val ? "dark" : "light";
    };
    // 请求sse接口
    fetchEventSource(
      "/dev-api/sse",
      {
        prompt: "",
        sessionId: ""
      },
      (str: any) => {
        let prefix = "data: ";
        if (!str.startsWith(prefix)) {
          return;
        }
        str = str.trim().slice(prefix.length);
        console.log("onmessage :>>>>>>>>>>>>>>>>>:::", str, printTxt.value, printTxt.value.length);
        printTxt.value += str.substring(printTxt.value.length);
      }
    );
    return {
      checked,
      theme,
      printTxt,
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
  .contain {
    font-size: 24px;
  }
}
</style>
