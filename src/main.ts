import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
// 主题颜色变量
import "./styles/theme.scss";
// 引入全局样式
import "./styles/index.scss";
// 引入移动端rem适配函数
import "./plugins/rem";

createApp(App).use(store, key).use(router).mount("#app");
