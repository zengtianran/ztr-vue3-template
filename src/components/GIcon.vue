<template>
  <i class="iconfont" :class="[iconClass, extraClass]"></i>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
interface IClassMap {
  arrowRight: string;
  arrowLeft: string;
  arrowDown: string;
  arrowUp: string;
  search: string;
}
const classMap: IClassMap = {
  arrowRight: "iconiconfontjiantou2",
  arrowLeft: "",
  arrowDown: "iconxiajiantou_huaban",
  arrowUp: "iconshangjiantou",
  search: "iconsousuo"
};
export default defineComponent({
  props: {
    type: {
      type: String,
      require: true,
      default: "search"
    },
    extraClass: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const iconClass = computed(() => {
      return classMap[props.type as keyof IClassMap];
    });
    return {
      iconClass
    };
  }
});
</script>
<style lang="scss" scoped>
// 导入iconfont样式文件
@import "~@/assets/iconfont/iconfont.css";
</style>
