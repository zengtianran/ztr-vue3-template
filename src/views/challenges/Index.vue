<template>
  <div class="challenge-wrap">
    <div class="top-fixed">
      <span>服务维护中，敬请期待</span>
    </div>
    <div class="line">DynamicsCss</div>
    <DynamicsCss></DynamicsCss>
    <div class="line">PropsType</div>
    <PropsType></PropsType>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DynamicsCss from "./components/DynamicsCss.vue";
import PropsType from "./components/PropsType.vue";
export default defineComponent({
  name: "challenges",
  components: {
    DynamicsCss,
    PropsType
  }
});
</script>

<style lang="scss" scoped>
.top-fixed {
  background: #f86a32;
  border: 1px solid #b0390a;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  span {
    font-size: 28px;
    color: #fff;
    display: block;
    height: 70px;
    line-height: 70px;
  }
}
.line {
  font-size: 24px;
  text-align: left;
  border-bottom: 1px solid #535150;
  padding: 10px 0;
}
</style>
