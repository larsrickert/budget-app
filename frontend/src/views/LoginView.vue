<script lang="ts" setup>
import LoginTemplate from "@/components/templates/LoginTemplate.vue";
import { config } from "@/config";
import { useAuthStore, type LoginPayload } from "@/stores/auth";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const isLoading = ref(false);
const router = useRouter();

const redirectTarget = computed(() => {
  const { redirectTo } = router.currentRoute.value.query;
  if (!redirectTo) return null;
  return typeof redirectTo === "string" ? redirectTo : redirectTo[0];
});

const handleSubmit = async (dto: LoginPayload) => {
  isLoading.value = true;

  try {
    await authStore.login(dto);
    await router.replace(redirectTarget.value || "/");
  } finally {
    isLoading.value = false;
  }
};

const testUser: LoginPayload = {
  usernameOrEmail: config.api.testUser.username,
  password: config.api.testUser.password,
};
</script>

<template>
  <LoginTemplate
    :disabled="isLoading"
    :loading="isLoading"
    :test-user="testUser"
    @submit="handleSubmit"
    @register="router.replace('/profile/new')"
  />
</template>

<style lang="scss" scoped></style>
