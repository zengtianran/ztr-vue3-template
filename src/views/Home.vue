<template>
  <div class="home">
    <h3 class="tips-title">输入框</h3>
    <g-input />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GInput from "../components/GInput.vue";

export default defineComponent({
  name: "Home",
  components: {
    GInput,
  },
});
</script>
<style lang="scss" scoped>
.tips-title {
  text-align: left;
  color: $text-color;
}
</style>
