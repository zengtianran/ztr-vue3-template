<template>
  <div class="wrap">
    <div class="request-idle-callback">requestIdleCallback</div>
    <van-button block type="primary" @click="jumpOut"> 跳转测试 </van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button } from "vant";
// type;
export default defineComponent({
  name: "RequestIdleCallback",
  components: {
    [Button.name]: Button
  },
  setup(props, context) {
    // 测试回退监听问题
    const url = "https://www.ylzpay.com/goldpay/goldplanPay.html";
    const workLoop = () => {};
    (window as any).requestIdleCallback(workLoop, {
      timeout: 1500
    });

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
.wrap {
  padding-top: 100px;
}
.request-idle-callback {
  font-size: 24px;
}
</style>
