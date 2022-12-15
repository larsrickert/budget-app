<script lang="ts" setup>
import type { LoginPayload } from "@/stores/auth";
import type { FormValidation } from "@/types/vue";
import { Finished, Key, User } from "@element-plus/icons-vue";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElLink,
  type FormInstance,
} from "element-plus";
import { computed, ref, type UnwrapRef } from "vue";
import { useI18n } from "vue-i18n";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

defineProps<{
  disabled?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (event: "submit", value: LoginPayload): void;
  (event: "register"): void;
}>();

const { t } = useI18n();

const state = ref<LoginPayload>({
  usernameOrEmail: "",
  password: "",
});

const rules = computed<FormValidation<UnwrapRef<typeof state>>>(() => ({
  usernameOrEmail: [
    { required: true, message: t("validations.required") },
    { min: 3, message: t("validations.minLength", { min: 3 }) },
    { max: 100, message: t("validations.maxLength", { max: 100 }) },
  ],
  password: [
    { required: true, message: t("validations.required") },
    { min: 8, message: t("validations.minLength", { min: 8 }) },
    { max: 72, message: t("validations.maxLength", { max: 72 }) },
  ],
}));

const formRef = ref<FormInstance | null>(null);

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (!valid) return;
    emit("submit", state.value);
  });
};
</script>

<template>
  <div>
    <HeaderOrganism :headline="t('login.pageName')" />

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
          <el-form-item
            :label="t('login.usernameOrEmail')"
            prop="usernameOrEmail"
          >
            <el-input
              :prefix-icon="User"
              name="usernameOrEmail"
              v-model.trim="state.usernameOrEmail"
            />
          </el-form-item>

          <el-form-item :label="t('profile.password')" prop="password">
            <el-input
              :prefix-icon="Key"
              type="password"
              show-password
              name="password"
              v-model="state.password"
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
            >
              {{ t("login.submit") }}
            </el-button>

            <el-link
              type="primary"
              :disabled="disabled"
              @click="emit('register')"
            >
              {{ t("login.register") }}
              <el-icon class="actions__icon"> <Finished /> </el-icon>
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
