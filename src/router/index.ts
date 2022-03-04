import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/newest",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "newest",
        name: "Newest",
        component: () => import("../views/components/newest.vue"),
      },
      {
        path: "recommend",
        name: "Recommend",
        component: () => import("../views/components/recommend.vue"),
      },
      {
        path: "search",
        name: "Search",
        component: () => import("../views/components/search.vue"),
      },
      {
        path: "mine",
        name: "Mine",
        component: () => import("../views/components/mine.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
