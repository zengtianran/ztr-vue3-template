<template>
  <div class="inp-groups">
    <input
      :type="type"
      class="g-input"
      :value="value"
      @input="handleInp"
      :placeholder="placeholder"
      :class="extraClass"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
      require: true,
      default: "text"
    },
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    extraClass: {
      type: String,
      default: ""
    }
  },
  emits: ["update:value"],
  setup(props, context) {
    const handleInp = ($event: Event) => {
      context.emit("update:value", ($event.target as HTMLInputElement).value);
    };
    return {
      handleInp
    };
  }
});
</script>
<style lang="scss" scoped>
.inp-groups {
  font-size: 14px;
}
.g-input {
  border: none;
  outline: none;
  padding: 16px 24px;
  width: 100%;
  height: 90px;
  line-height: 90px;
  box-sizing: border-box;
  font-size: 30px;
  color: #222222;
  &::placeholder {
    color: #ddd;
  }
}
</style>
