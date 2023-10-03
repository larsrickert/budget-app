<script lang="ts" setup>
import type { UpdateUserDto, User } from "@/stores/auth";
import type { FormValidation } from "@/types/vue";
import {
  Key,
  Message,
  TurnOff,
  User as UserIcon,
} from "@element-plus/icons-vue";
import {
  ElButton,
  ElEmpty,
  ElForm,
  ElFormItem,
  ElInput,
  type FormInstance,
  type FormItemRule,
} from "element-plus";
import { computed, ref, watchEffect, type UnwrapRef } from "vue";
import { useI18n } from "vue-i18n";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";
import MyProfileActionsOrganism from "../organisms/MyProfileActionsOrganism.vue";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    isSubmitLoading?: boolean;
    isDeleteLoading?: boolean;
    user?: User;
    allowEmailChange?: boolean;
  }>(),
  {
    allowEmailChange: true,
  },
);

const emit = defineEmits<{
  (event: "submit", dto: UpdateUserDto): void;
  (event: "requestEmailVerification"): void;
  (event: "logout"): void;
  (event: "deleteUser"): void;
}>();

const { t } = useI18n();

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
            t("validations.sameAs", { otherName: t("profile.password") }),
          ),
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
        <MyProfileActionsOrganism
          :avatar="user.avatar"
          :created-date="user.created"
          :is-verified="user.verified"
          :disabled="disabled"
          :loading="isDeleteLoading"
          @request-email-verification="emit('requestEmailVerification')"
          @avatar-select="state.avatar = $event"
          @delete-user="emit('deleteUser')"
        />

        <el-form
          ref="formRef"
          label-position="top"
          :disabled="disabled"
          require-asterisk-position="right"
          :model="state"
          :rules="rules"
          status-icon
          scroll-to-error
          :validate-on-rule-change="false"
        >
          <div class="grid grid--2">
            <el-form-item :label="t('profile.username')" prop="username">
              <el-input
                v-model.trim="state.username"
                :prefix-icon="UserIcon"
                name="username"
              />
            </el-form-item>

            <el-form-item :label="t('profile.email')" prop="email">
              <el-input
                v-model.trim="state.email"
                :disabled="!allowEmailChange"
                :prefix-icon="Message"
                type="email"
                name="email"
              />
            </el-form-item>
          </div>

          <div class="grid grid--2">
            <el-form-item :label="t('profile.password')" prop="password">
              <el-input
                v-model="state.password"
                :prefix-icon="Key"
                type="password"
                show-password
                name="password"
              />
            </el-form-item>

            <template v-if="showPasswordConfirm">
              <el-form-item
                :label="t('profile.passwordConfirm')"
                prop="passwordConfirm"
              >
                <el-input
                  v-model="state.passwordConfirm"
                  :prefix-icon="Key"
                  type="password"
                  show-password
                  name="passwordConfirm"
                />
              </el-form-item>

              <el-form-item
                :label="t('profile.oldPassword')"
                prop="oldPassword"
              >
                <el-input
                  v-model="state.oldPassword"
                  :prefix-icon="Key"
                  type="password"
                  show-password
                  name="oldPassword"
                />
              </el-form-item>
            </template>
          </div>

          <el-form-item>
            <el-button
              type="primary"
              :loading="isSubmitLoading"
              :disabled="disabled || !hasDataChanged"
              @click="handleSubmit"
            >
              {{ t("global.update") }}
            </el-button>
          </el-form-item>
        </el-form>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
