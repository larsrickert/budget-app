import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("@/views/MyProfileView.vue"),
        },
        {
          path: "new",
          name: "createProfile",
          component: () => import("@/views/CreateProfileView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
  ],
});

export default router;
