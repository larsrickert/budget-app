import { useAuthStore } from "@/stores/auth";
import type { NavigationGuardWithThis } from "vue-router";

const authGuard: NavigationGuardWithThis<undefined> = (to) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated && to.meta.requiresAuth) {
    return "/login";
  }
};

export default authGuard;
