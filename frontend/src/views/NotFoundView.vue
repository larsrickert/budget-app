<script lang="ts" setup>
import NotFoundTemplate from "@/components/templates/NotFoundTemplate.vue";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const { t } = useI18n();
const router = useRouter();
</script>

<template>
  <NotFoundTemplate
    :path="router.currentRoute.value.path"
    :action-label="
      t(`notFound.backTo${authStore.isAuthenticated ? 'HomePage' : 'Login'}`)
    "
    @action-click="router.replace(authStore.isAuthenticated ? '/' : '/login')"
  />
</template>
