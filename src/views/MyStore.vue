<template>
  <div class="cls-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { List, Cell } from "vant";
import { getUserList } from "@/api/user";
export default defineComponent({
  name: "MyStore",
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },
  setup(props, context) {
    const list = ref<any[]>([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = async () => {
      const res = await getUserList({
        token: "123"
      });
      console.log(res);
      list.value = res.items;
      loading.value = false;
      if (list.value.length >= 30) {
        finished.value = true;
      }
    };

    onMounted(async () => {});

    return {
      list,
      loading,
      onLoad,
      finished
    };
  }
});
</script>

<style lang="scss" scoped>
div {
  color: #2c3e50;
}
</style>
