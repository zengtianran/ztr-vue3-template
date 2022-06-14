<template>
  <div class="top-search-wrap">
    <form class="search-inner" @submit="handleSearch">
      <div class="search-inp">
        <Input type="text" v-model:value="inpVal" v-bind="$attrs" :placeholder="placeholder" />
      </div>
      <div class="search-icon" @click="handleSearch">
        <g-icon type="search" extraClass="search" />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, withDefaults, defineEmits } from "vue";
import GIcon from "./GIcon.vue";
import Input from "./GInput.vue";
// const emit = defineEmits(["search"]);
// definedEmits TS写法
const emit = defineEmits<{
  (e: "search", inpVal: string): void;
}>();
interface ISearchProps {
  placeholder: string;
}
// withDefaults设置默认值
withDefaults(defineProps<ISearchProps>(), {
  placeholder: "请输入关键字"
});
let inpVal = ref<string>("");
// 搜索框触发事件
const handleSearch = () => {
  emit("search", inpVal);
};
</script>

<style lang="scss" scoped>
.top-search-wrap {
  padding: 14px;
  .search-inner {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
    border: 1px solid $border-color;
    border-radius: 5px;
  }
  .search-inp {
    flex: 1;
  }
  .search-icon {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 14px;
    .search {
      font-size: 42px;
      color: $text-color;
    }
  }
}
</style>
