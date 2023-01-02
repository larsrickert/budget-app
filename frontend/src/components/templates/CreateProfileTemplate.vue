<script lang="ts" setup>
import type { CreateUserDto } from "@/stores/auth";
import type { FormValidation } from "@/types/vue";
import { Key, Message, User, UserFilled } from "@element-plus/icons-vue";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElLink,
  type FormInstance,
  type FormItemRule,
} from "element-plus";
import { computed, reactive, ref, type UnwrapRef } from "vue";
import { useI18n } from "vue-i18n";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

defineProps<{
  disabled?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (event: "submit", dto: CreateUserDto, reset: () => void): void;
  (event: "login"): void;
}>();

const { t } = useI18n();

const state = ref<CreateUserDto>({
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const passwordRules = reactive<FormItemRule[]>([
  { required: true, message: t("validations.required") },
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
  password: passwordRules,
  passwordConfirm: [
    ...passwordRules,
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
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (!valid) return;
    emit("submit", { ...state.value }, reset);
  });
};

const reset = () => formRef.value?.resetFields();
</script>

<template>
  <div>
    <HeaderOrganism :headline="t('profile.createPageName')" />

    <div class="page__content">
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
              :prefix-icon="User"
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
        </div>

        <el-form-item>
          <div class="actions">
            <el-button
              type="primary"
              :loading="loading"
              :disabled="disabled"
              @click="handleSubmit"
              data-cy="submit"
            >
              {{ t("profile.actions.create") }}
            </el-button>

            <el-link type="primary" :disabled="disabled" @click="emit('login')">
              {{ t("profile.login") }}
              <el-icon class="actions__icon"> <UserFilled /> </el-icon>
            </el-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  gap: var(--app-space-1) var(--app-space-3);
  flex-wrap: wrap;

  &__icon {
    margin-left: var(--app-space-1);
  }
}
</style>
