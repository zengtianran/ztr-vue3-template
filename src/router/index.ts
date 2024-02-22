import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/myStore",
    name: "MyStore",
    component: () => import(/* webpackChunkName: "myStore" */ "../views/MyStore.vue")
  },
  {
    path: "/challenges",
    name: "challenges",
    component: () => import(/* webpackChunkName: "challenges" */ "../views/challenges/Index.vue")
  },
  {
    path: "/requestIdleCallback",
    name: "requestIdleCallback",
    component: () =>
      import(/* webpackChunkName: "requestIdleCallback" */ "../views/requestIdleCallback/Index.vue")
  },
  {
    path: "/locationTest",
    name: "locationTest",
    component: () => import(/* webpackChunkName: "locationTest" */ "../views/Location/Index.vue")
  },
  {
    path: "/theme",
    name: "theme",
    component: () => import(/* webpackChunkName: "theme" */ "../views/theme/Index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
