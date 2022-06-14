<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>{{ _data }}</span>
  </div>
  <Tabbar v-model="active">
    <TabbarItem name="home" icon="home-o">标签</TabbarItem>
    <TabbarItem name="search" icon="search">标签</TabbarItem>
    <TabbarItem name="friends" icon="friends-o">标签</TabbarItem>
    <TabbarItem name="setting" icon="setting-o">标签</TabbarItem>
  </Tabbar>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Tabbar, TabbarItem } from "vant";
const _data = ref("vue3.2.1");
let active = ref<string>("home");

onMounted(() => {
  console.log("onMounted :>> ", "onMounted");
});
</script>
<style lang="scss" scoped>
.about {
  h1 {
    font-size: 30px;
  }
  span {
    font-size: 28px;
  }
}
</style>
