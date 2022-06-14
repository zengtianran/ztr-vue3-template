import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局样式
import "./styles/index.scss";
// 引入移动端rem适配函数
import "./plugins/rem";

createApp(App).use(store).use(router).mount("#app");
