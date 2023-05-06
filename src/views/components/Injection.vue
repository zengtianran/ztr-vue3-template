<template>
  <div>
    <span class="inj-cls">login footer {{ userInfo!.name }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { userInjectionKey, setUserInjectionKey, SetUser } from "./type";
export default defineComponent({
  name: "Injection",
  setup(props, context) {
    const userInfo = inject(userInjectionKey);
    const setUser = inject(setUserInjectionKey) as SetUser;
    console.log("Injection Components>>", userInfo);
    setUser({
      name: "KK-GG",
      nickName: "",
      pass: 123456,
      age: 12,
      relation: {
        name: "",
        age: 12
      },
      level: ["123"]
    });
    return {
      userInfo,
      setUser
    };
  }
});
</script>

<style lang="scss" scoped>
.inj-cls {
  font-size: 32px;
  color: #686868;
}
</style>
