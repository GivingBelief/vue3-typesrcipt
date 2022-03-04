import { createApp } from "vue";
import App from "./App.vue";
import Antd, { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import * as Icons from "@ant-design/icons-vue"; // 批量引入antd的图标组件
import router from "./router";
import store from "./store";
// 全局路由守卫
router.beforeEach((to, from, next) => {
  store.commit(
    "ADD_ASPIN",
    (JSON.parse(JSON.stringify(store.state)).appStore.SpinState = true)
  );
  // 获取存储localStorage的token
  const token = localStorage.getItem("token");
  if (!token) {
    if (to.path == "/login") return next();
    message.error("登录状态过期，请重新登录");
    return next("/login");
    // 如果token没有过期，又是选择了登录页面就直接重定向到首页
  } else {
    if (to.path == "/login") {
      return next("/home");
    }
    // setTimeout(()=>{return next("/home");},2000)
  }
  next();
});
const app = createApp(App);
app.use(router).use(store).use(Antd).mount("#app");
const icons: any = Icons;
for (const i in icons) {
  app.component(i, icons[i]);
}
