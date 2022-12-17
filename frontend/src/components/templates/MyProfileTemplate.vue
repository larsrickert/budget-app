<script lang="ts" setup>
import type { UpdateUserDto, User } from "@/stores/auth";
import type { FormValidation } from "@/types/vue";
import { showToast } from "@/utils/io";
import {
  Key,
  Message,
  TurnOff,
  User as UserIcon,
  UserFilled,
} from "@element-plus/icons-vue";
import { computedAsync } from "@vueuse/core";
import {
  ElAvatar,
  ElButton,
  ElEmpty,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElTag,
  ElTooltip,
  type FormInstance,
  type FormItemRule,
} from "element-plus";
import { computed, ref, watchEffect, type UnwrapRef } from "vue";
import { useI18n } from "vue-i18n";
import ConfirmDialogMolecule from "../molecules/ConfirmDialogMolecule.vue";
import FileSelectOrganism from "../organisms/FileSelectOrganism.vue";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

const props = defineProps<{
  disabled?: boolean;
  loading?: boolean;
  user?: User;
}>();

const emit = defineEmits<{
  (event: "submit", dto: UpdateUserDto): void;
  (event: "requestEmailVerification"): void;
  (event: "logout"): void;
}>();

const { t, d } = useI18n();

const state = ref<UpdateUserDto>({
  username: "",
  email: "",
  oldPassword: "",
  password: "",
  passwordConfirm: "",
});

watchEffect(() => {
  if (!props.user) return;
  state.value = {
    username: props.user.username,
    email: props.user.email,
    avatar: undefined,
    oldPassword: "",
    password: "",
    passwordConfirm: "",
  };
});

const showPasswordConfirm = computed(() => !!state.value.password);

const hasDataChanged = computed(() => {
  return (
    state.value.username !== props.user?.username ||
    state.value.email !== props.user?.email ||
    !!state.value.password ||
    !!state.value.avatar
  );
});

const passwordRules = computed<FormItemRule[]>(() => [
  { required: showPasswordConfirm.value, message: t("validations.required") },
  { min: 8, message: t("validations.minLength", { min: 8 }) },
  { max: 72, message: t("validations.maxLength", { max: 72 }) },
]);

const rules = computed<FormValidation<UnwrapRef<typeof state>>>(() => ({
  username: [
    { required: true, message: t("validations.required") },
    { min: 3, message: t("validations.minLength", { min: 3 }) },
    { max: 100, message: t("validations.maxLength", { max: 100 }) },
  ],
  email: [
    { required: true, message: t("validations.required") },
    { type: "email", message: t("validations.email") },
    { max: 255, message: t("validations.maxLength", { max: 255 }) },
  ],
  oldPassword: passwordRules.value,
  password: passwordRules.value,
  passwordConfirm: [
    ...passwordRules.value,
    {
      validator: (rule, value, callback) => {
        if (!value || value === state.value.password) callback();
        callback(
          new Error(
            t("validations.sameAs", { otherName: t("profile.password") })
          )
        );
      },
    },
  ],
}));

const formRef = ref<FormInstance | null>(null);

const handleSubmit = async () => {
  if (!formRef.value || !hasDataChanged.value) return;
  await formRef.value.validate((valid) => {
    if (!valid) return;
    emit("submit", { ...state.value });
  });
};

const isVerifyEmailDisabled = ref(false);

const handleVerifyEmail = () => {
  if (isVerifyEmailDisabled.value) return;
  emit("requestEmailVerification");
  isVerifyEmailDisabled.value = true;
};

const showEditAvatarDialog = ref(false);
const allowedAvatarTypes = [".jpg", ".jpeg", ".png", ".svg", ".webp"];

const selectedAvatarPreviewSrc = computedAsync(async () => {
  if (!state.value.avatar) return "";
  const reader = new FileReader();
  const promise = new Promise<string>((resolve) => {
    reader.onload = (ev) => {
      const data = ev.target?.result;
      resolve(typeof data === "string" ? data : "");
    };
    reader.onerror = () => resolve("");
  });

  reader.readAsDataURL(state.value.avatar);
  return promise;
});

const selectAvatar = (file?: File) => {
  state.value.avatar = file;
  if (file) showEditAvatarDialog.value = false;
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
    <HeaderOrganism
      :headline="t('profile.myProfilePageName')"
      :right-icon="user && TurnOff"
      :right-icon-text="t('profile.logout')"
      @right-icon-click="emit('logout')"
    />

    <div class="page__content">
      <el-empty v-if="!user" :description="t('profile.notLoggedIn')" />

      <template v-else>
        <div class="meta">
          <el-tooltip :content="t('profile.changeAvatar')">
            <el-avatar
              :size="100"
              :src="selectedAvatarPreviewSrc || user.avatar"
              @click="showEditAvatarDialog = true"
            >
              <el-icon :size="48">
                <UserFilled />
              </el-icon>
            </el-avatar>
          </el-tooltip>

          <div class="meta__items">
            <div>
              <span class="meta__label">
                {{ t("profile.registeredSince") }}:
              </span>
              <span>{{ user.created ? d(user.created) : "-" }}</span>
            </div>
            <div>
              <span class="meta__label">
                {{ t("profile.emailStatus.label") }}:
              </span>

              <el-tag v-if="user.verified" type="success">
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

        <el-form
          label-position="top"
          :disabled="disabled"
          require-asterisk-position="right"
          :model="state"
          :rules="rules"
          status-icon
          scroll-to-error
          :validate-on-rule-change="false"
          ref="formRef"
        >
          <div class="grid grid--2">
            <el-form-item :label="t('profile.username')" prop="username">
              <el-input
                :prefix-icon="UserIcon"
                name="username"
                v-model.trim="state.username"
              />
            </el-form-item>

            <el-form-item :label="t('profile.email')" prop="email">
              <el-input
                :prefix-icon="Message"
                type="email"
                name="email"
                v-model.trim="state.email"
              />
            </el-form-item>
          </div>

          <div class="grid grid--2">
            <el-form-item :label="t('profile.password')" prop="password">
              <el-input
                :prefix-icon="Key"
                type="password"
                show-password
                name="password"
                v-model="state.password"
              />
            </el-form-item>

            <template v-if="showPasswordConfirm">
              <el-form-item
                :label="t('profile.passwordConfirm')"
                prop="passwordConfirm"
              >
                <el-input
                  :prefix-icon="Key"
                  type="password"
                  show-password
                  name="passwordConfirm"
                  v-model="state.passwordConfirm"
                />
              </el-form-item>

              <el-form-item
                :label="t('profile.oldPassword')"
                prop="oldPassword"
              >
                <el-input
                  :prefix-icon="Key"
                  type="password"
                  show-password
                  name="oldPassword"
                  v-model="state.oldPassword"
                />
              </el-form-item>
            </template>
          </div>

          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              @click="handleSubmit"
              :disabled="disabled || !hasDataChanged"
            >
              {{ t("global.update") }}
            </el-button>
          </el-form-item>
        </el-form>
      </template>
    </div>

    <ConfirmDialogMolecule
      v-model="showEditAvatarDialog"
      :cancel-text="t('global.cancel')"
      :confirm-text="t('global.select')"
      :title="t('profile.changeAvatar')"
      :disabled="disabled"
      :loading="loading"
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

.meta {
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
    width: 128px;
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
