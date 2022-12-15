<script lang="ts" setup>
import { useAuthStore, type UpdateUserDto } from "@/stores/auth";
import { showToast } from "@/utils/io";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const authStore = useAuthStore();
const { t } = useI18n();

const isLoading = ref(false);

const handleSubmit = async (dto: UpdateUserDto) => {
  isLoading.value = true;
  try {
    await authStore.updateUser(dto);
    showToast({
      message: t("profile.toasts.updated"),
      type: "success",
      duration: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>Work in progress.</div>
</template>

<style lang="scss" scoped></style>
