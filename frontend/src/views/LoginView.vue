<script lang="ts" setup>
import LoginTemplate from "@/components/templates/LoginTemplate.vue";
import { useAuthStore, type LoginPayload } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const isLoading = ref(false);
const router = useRouter();

const handleSubmit = async (dto: LoginPayload) => {
  isLoading.value = true;

  try {
    await authStore.login(dto);
    await router.replace("/");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <LoginTemplate
    :disabled="isLoading"
    :loading="isLoading"
    @submit="handleSubmit"
    @register="router.replace('/profile/new')"
  />
</template>

<style lang="scss" scoped></style>
