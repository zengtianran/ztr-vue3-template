<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>{{ _data }}</span>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

const _data = ref("vue3.2.1");

onMounted(() => {
  console.log("onMounted :>> ", "onMounted");
});
</script>
