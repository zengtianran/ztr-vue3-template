<template>
  <p>Hello PropsTypes</p>
</template>

<!-- 定义两个style作用于全局 -->
<!-- <style>
/* 使其工作 */
body {
  width: 100vw;
  height: 100vh;
  background-color: burlywood;
}
</style> -->

<style scoped>
:global(body) {
  width: 100vw;
  height: 100vh;
  background-color: #e18307;
}
p {
  font-size: 20px;
  color: red;
  text-align: center;
  line-height: 50px;
}
</style>
