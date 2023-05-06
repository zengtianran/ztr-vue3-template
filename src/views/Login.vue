<template>
  <div class="login-wrap">
    <div class="login-top__title">{{ userInfo.name }}</div>
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
    <injection></injection>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, Ref } from "vue";
import { Form, Field, CellGroup, Button } from "vant";
import { userInjectionKey, setUserInjectionKey } from "./components/type";
import { UserActionTypes } from "@/store/modules/user/action-types";
import { IUserLoginInfo } from "@/types/user";
import { useStore } from "@/store/index";
import Injection from "./components/Injection.vue";
export default defineComponent({
  name: "Login",
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    Injection
  },
  setup(props, context) {
    const store = useStore();
    let username = ref("");
    let password = ref("");
    const userInfo = ref<IUserLoginInfo>({
      name: "zs",
      nickName: "",
      pass: 123456,
      age: 12,
      relation: {
        name: "",
        age: 12
      },
      level: ["123"]
    });
    // 修改用户信息数据，确保在数据提供的位置进行数据修改
    const setUser = (userData: IUserLoginInfo) => {
      userInfo.value.name = userData.name;
      userInfo.value.nickName = userData.nickName;
      userInfo.value.pass = userData.pass;
      userInfo.value.age = userData.age;
    };
    // provide
    provide(userInjectionKey, userInfo);
    provide(setUserInjectionKey, setUser);
    const onSubmit = () => {
      console.log("onSubmit :>> ", username.value, password.value);
      // 登录操作
      store.dispatch(UserActionTypes.LOGIN, "898989");
    };

    return {
      username,
      password,
      userInfo,
      onSubmit
    };
  }
});
</script>

<style lang="scss" scoped>
.login-top__title {
  text-align: left;
  color: #767676;
  font-size: 34px;
  padding-left: 30px;
}
</style>
