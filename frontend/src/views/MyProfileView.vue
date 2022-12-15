<script lang="ts" setup>
import MyProfileTemplate from "@/components/templates/MyProfileTemplate.vue";
import { useFile } from "@/composables/use-file";
import { useAuthStore, type UpdateUserDto } from "@/stores/auth";
import { showToast } from "@/utils/io";
import { ElEmpty } from "element-plus";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const authStore = useAuthStore();
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
</script>

<template>
  <div>
    <MyProfileTemplate
      v-if="authStore.user"
      :user="{ ...authStore.user, avatar: avatarUrl }"
      @submit="handleSubmit"
      @request-email-verification="handleRequestEmailVerification"
    />

    <el-empty v-else :description="t('profile.notLoggedIn')" />
  </div>
</template>

<style lang="scss" scoped></style>
