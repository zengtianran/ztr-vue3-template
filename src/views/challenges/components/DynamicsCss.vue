<template>
  <div>
    <p class="dynamic-css">DynamicCss</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "DynamicCss",
  setup() {
    let color = ref("red");
    const colors = ["red", "green", "blue", "yellow", "orange"];
    setInterval(() => (color.value = colors[Math.floor(Math.random() * 5)]), 5000);
    return {
      color
    };
  }
});
</script>

<style lang="scss" scoped>
.dynamic-css {
  font-size: 28px;
  color: v-bind(color);
}
</style>
