<template>
  <div class="home">
    <h3 class="tips-title">输入框</h3>
    <g-top-search type="text" placeholder="请输入关键字" />
    <van-button block type="primary" @click="jumpOut"> 跳转测试 </van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/index";
import { Button } from "vant";
import GTopSearch from "../components/GTopSearch.vue";

export default defineComponent({
  name: "Home",
  components: {
    GTopSearch,
    [Button.name]: Button
  },
  setup() {
    const store = useStore();
    console.log("Home :>> ", store.state.user.pass);
    // 测试回退监听问题
    const url = "https://www.ylzpay.com/goldpay/goldplanPay.html";

    window.addEventListener(
      "popstate",
      function (e) {
        console.log(">>>>>>>", e);
      },
      false
    );

    const jumpOut = () => {
      window.location.href = url;
    };

    return {
      jumpOut
    };
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
