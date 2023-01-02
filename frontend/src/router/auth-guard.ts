import { useAuthStore } from "@/stores/auth";
import type { NavigationGuardWithThis } from "vue-router";

const authGuard: NavigationGuardWithThis<undefined> = (to) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated && to.meta.requiresAuth) {
    return {
      path: "/login",
      query: to.path !== "/" ? { redirectTo: to.path } : undefined,
    };
  }
};

export default authGuard;
