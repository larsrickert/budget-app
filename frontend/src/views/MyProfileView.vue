<script lang="ts" setup>
import MyProfileTemplate from "@/components/templates/MyProfileTemplate.vue";
import { useFile } from "@/composables/use-file";
import { useAuthStore, type UpdateUserDto } from "@/stores/auth";
import { showToast } from "@/utils/io";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const { t } = useI18n();

const isLoading = ref(false);

const handleSubmit = async (dto: UpdateUserDto) => {
  isLoading.value = true;
  try {
    await authStore.updateUser(dto);
    showToast({
      message: t(
        `profile.toasts.${
          dto.email !== authStore.user?.email ? "updatedWithEmail" : "updated"
        }`
      ),
      type: "success",
      duration: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};

const handleRequestEmailVerification = async () => {
  const success = await authStore.requestEmailVerification();
  if (!success) return;
  showToast({
    message: t("profile.toasts.requestedEmailVerification"),
    type: "success",
    duration: 3000,
  });
};

const { file: avatarUrl } = useFile({
  collection: "users",
  record: computed(() => authStore.user?.id),
  filename: computed(() => authStore.user?.avatar),
  format: { height: 100, width: 100 },
});

const handleLogout = async () => {
  authStore.logout();
  await router.push("/login");
};

const isDeleteLoading = ref(false);
const handleDeleteUser = async () => {
  isDeleteLoading.value = true;
  try {
    await authStore.deleteUser();
    router.push("/login");
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<template>
  <div>
    <MyProfileTemplate
      :user="
        authStore.user ? { ...authStore.user, avatar: avatarUrl } : undefined
      "
      :is-submit-loading="isLoading"
      :is-delete-loading="isDeleteLoading"
      @submit="handleSubmit"
      @request-email-verification="handleRequestEmailVerification"
      @logout="handleLogout"
      @delete-user="handleDeleteUser"
    />
  </div>
</template>

<style lang="scss" scoped></style>
