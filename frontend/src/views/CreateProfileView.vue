<script lang="ts" setup>
import CreateProfileTemplate from "@/components/templates/CreateProfileTemplate.vue";
import { useAuthStore, type CreateUserDto } from "@/stores/auth";
import { showToast } from "@/utils/io";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const { t } = useI18n();
const router = useRouter();

const isLoading = ref(false);

const handleSubmit = async (dto: CreateUserDto, reset: () => void) => {
  isLoading.value = true;
  try {
    await authStore.createUser(dto);
    reset();
    showToast({
      message: t("profile.toasts.created"),
      type: "success",
      duration: 3000,
    });

    try {
      await authStore.login({
        usernameOrEmail: dto.email,
        password: dto.password,
      });
      await router.push("/");
    } catch {
      await router.push("/login");
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <CreateProfileTemplate
    :disabled="isLoading"
    :loading="isLoading"
    @submit="handleSubmit"
    @login="router.replace('/login')"
  />
</template>

<style lang="scss" scoped></style>
