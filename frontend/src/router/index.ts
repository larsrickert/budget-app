import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";
import authGuard from "./auth-guard";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("@/views/MyProfileView.vue"),
          meta: { requiresAuth: true },
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
    {
      path: "/accounts",
      children: [
        {
          path: "new",
          name: "createAccount",
          component: () => import("@/views/CreateAccountView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: ":id",
          name: "editAccount",
          component: () => import("@/views/EditAccountView.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/transactions",
      children: [
        {
          path: "",
          name: "transactions",
          component: () => import("@/views/TransactionsView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "new",
          name: "createTransaction",
          component: () => import("@/views/CreateTransactionView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: ":id",
          name: "editTransaction",
          component: () => import("@/views/EditTransactionView.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/SettingsView.vue"),
    },
    // catch-all 404 route
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

router.beforeEach(authGuard);

export default router;
