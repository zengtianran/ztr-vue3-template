<template>
  <div class="login-wrap">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Form, Field, CellGroup, Button } from "vant";
export default defineComponent({
  name: "Login",
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  },
  setup(props, context) {
    let username = ref("");
    let password = ref("");
    const onSubmit = () => {
      console.log("onSubmit :>> ", username.value, password.value);
    };

    return {
      username,
      password,
      onSubmit
    };
  }
});
</script>

<style lang="less" scoped></style>
