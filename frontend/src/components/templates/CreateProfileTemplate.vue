<script lang="ts" setup>
import type { CreateUserDto } from "@/stores/auth";
import type { FormValidation } from "@/types/vue";
import { Key, Message, User } from "@element-plus/icons-vue";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  type FormInstance,
} from "element-plus";
import { reactive, ref, useSlots, watchEffect, type UnwrapRef } from "vue";
import { useI18n } from "vue-i18n";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

const props = defineProps<{
  headline: string;
  submitLabel: string;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
  initialValue?: Omit<CreateUserDto, "password" | "passwordConfirm">;
}>();

const emit = defineEmits<{
  (event: "submit", dto: CreateUserDto, reset: () => void): void;
}>();

const { t } = useI18n();
const slots = useSlots();

const state = ref<CreateUserDto>({
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

watchEffect(() => {
  if (!props.initialValue) return;
  state.value = { ...props.initialValue, password: "", passwordConfirm: "" };
});

const rules = reactive<FormValidation<UnwrapRef<typeof state>>>({
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
  password: [
    { required: true, message: t("validations.required") },
    { min: 8, message: t("validations.minLength", { min: 8 }) },
    { max: 72, message: t("validations.maxLength", { max: 72 }) },
  ],
  passwordConfirm: [
    { required: true, message: t("validations.required") },
    { min: 8, message: t("validations.minLength", { min: 8 }) },
    { max: 72, message: t("validations.maxLength", { max: 72 }) },
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
});

const formRef = ref<FormInstance | null>(null);

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (!valid) return;
    emit("submit", state.value, reset);
  });
};

const reset = () => formRef.value?.resetFields();
</script>

<template>
  <div>
    <HeaderOrganism :headline="headline" />

    <div class="page__content">
      <div class="slot--before" v-if="!!slots.default">
        <slot></slot>
      </div>

      <el-form
        label-position="top"
        :disabled="disabled"
        require-asterisk-position="right"
        :model="state"
        :rules="readonly ? undefined : rules"
        status-icon
        scroll-to-error
        ref="formRef"
      >
        <div class="grid grid--2">
          <el-form-item :label="t('profile.username')" prop="username">
            <el-input
              :prefix-icon="User"
              name="username"
              :readonly="readonly"
              v-model.trim="state.username"
            />
          </el-form-item>

          <el-form-item :label="t('profile.email')" prop="email">
            <el-input
              :prefix-icon="Message"
              type="email"
              name="email"
              :readonly="readonly"
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
              :readonly="readonly"
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
              :readonly="readonly"
              v-model="state.passwordConfirm"
            />
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSubmit">
            {{ submitLabel }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slot {
  &--before {
    margin-bottom: var(--app-space-3);
  }
}
</style>
