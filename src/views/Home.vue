<template>
  <div class="home">
    <h3 class="tips-title">输入框</h3>
    <g-top-search type="text" placeholder="请输入关键字" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GTopSearch from "../components/GTopSearch.vue";

export default defineComponent({
  name: "Home",
  components: {
    GTopSearch
  }
});
</script>
<style lang="scss" scoped>
.tips-title {
  text-align: left;
  color: $text-color;
  font-size: 30px;
}
</style>
