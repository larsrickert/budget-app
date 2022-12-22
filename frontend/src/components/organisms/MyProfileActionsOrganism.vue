<script lang="ts" setup>
import { showToast } from "@/utils/io";
import { UserFilled } from "@element-plus/icons-vue";
import { computedAsync } from "@vueuse/core";
import { ElAvatar, ElIcon, ElTag, ElTooltip } from "element-plus";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import ConfirmDialogMolecule from "../molecules/ConfirmDialogMolecule.vue";
import FileSelectOrganism from "./FileSelectOrganism.vue";

withDefaults(
  defineProps<{
    avatar?: string;
    createdDate?: string;
    isVerified?: boolean;
    disabled?: boolean;
    allowedAvatarTypes?: string[];
  }>(),
  {
    allowedAvatarTypes: () => [".jpg", ".jpeg", ".png", ".svg", ".webp"],
  }
);

const emit = defineEmits<{
  (event: "requestEmailVerification"): void;
  (event: "avatarSelect", value?: File): void;
}>();

const { t, d } = useI18n();

const showEditAvatarDialog = ref(false);
const isVerifyEmailDisabled = ref(false);
const newAvatar = ref<File>();

const handleVerifyEmail = () => {
  if (isVerifyEmailDisabled.value) return;
  emit("requestEmailVerification");
  isVerifyEmailDisabled.value = true;
};

const selectedAvatarPreviewSrc = computedAsync(async () => {
  if (!newAvatar.value) return "";
  const reader = new FileReader();
  const promise = new Promise<string>((resolve) => {
    reader.onload = (ev) => {
      const data = ev.target?.result;
      resolve(typeof data === "string" ? data : "");
    };
    reader.onerror = () => resolve("");
  });

  reader.readAsDataURL(newAvatar.value);
  return promise;
});

const selectAvatar = (file?: File) => {
  newAvatar.value = file;
  if (file) showEditAvatarDialog.value = false;
  emit("avatarSelect", file);
};

const handleFileSizeExceed = () => {
  showToast({
    message: t("profile.fileSizeExceeded", 5),
    duration: 3000,
    type: "error",
  });
};
</script>

<template>
  <div>
    <div class="actions">
      <el-tooltip :content="t('profile.changeAvatar')">
        <el-avatar
          :size="100"
          :src="selectedAvatarPreviewSrc || avatar"
          @click="showEditAvatarDialog = true"
        >
          <el-icon :size="48">
            <UserFilled />
          </el-icon>
        </el-avatar>
      </el-tooltip>

      <div class="actions__items">
        <div>
          <span class="actions__label">
            {{ t("profile.registeredSince") }}:
          </span>
          <span>{{ createdDate ? d(createdDate) : "-" }}</span>
        </div>
        <div>
          <span class="actions__label">
            {{ t("profile.emailStatus.label") }}:
          </span>

          <el-tag v-if="isVerified" type="success">
            {{ t("profile.emailStatus.verified") }}
          </el-tag>
          <el-tag
            v-else
            type="danger"
            :class="!isVerifyEmailDisabled && 'verify-email-btn'"
            @click="handleVerifyEmail"
          >
            {{ t("profile.emailStatus.notVerified") }}
          </el-tag>
        </div>
      </div>
    </div>

    <ConfirmDialogMolecule
      v-model="showEditAvatarDialog"
      :cancel-text="t('global.cancel')"
      :confirm-text="t('global.select')"
      :title="t('profile.changeAvatar')"
      :disabled="disabled"
      :show-actions="false"
    >
      <FileSelectOrganism
        :allowed-file-types="allowedAvatarTypes"
        :max-size="5"
        :limit="1"
        :disabled="disabled"
        replace
        @change="selectAvatar($event[0])"
        @exceed-file-size="handleFileSizeExceed"
      />
    </ConfirmDialogMolecule>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/mixins.scss" as *;

.actions {
  display: flex;
  gap: var(--app-space-2) var(--app-space-3);
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: var(--app-space-3);

  @include breakpoint(s) {
    gap: var(--app-space-2);
  }

  &__items {
    display: grid;
    gap: calc(1.5 * var(--app-space-1));
  }

  &__label {
    display: inline-block;
    width: 140px;
    margin-right: var(--app-space-2);
    font-weight: 500;
  }

  .el-avatar {
    cursor: pointer;
  }
}

.verify-email-btn {
  cursor: pointer;
}
</style>
