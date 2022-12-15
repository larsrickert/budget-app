import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
          component: () => import("@/views/ProfileView.vue"),
        },
        {
          path: "new",
          name: "createProfile",
          component: () => import("@/views/CreateProfileView.vue"),
        },
      ],
    },
  ],
});

export default router;
