<script lang="ts" setup>
import type { CreateAccountDto } from "@/composables/use-account";
import type { FormValidation } from "@/types/vue";
import { Wallet, Warning } from "@element-plus/icons-vue";
import {
  ElButton,
  ElEmpty,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElPopconfirm,
  type FormInstance,
} from "element-plus";
import { computed, ref, watchEffect, type UnwrapRef } from "vue";
import { useI18n } from "vue-i18n";
import HeadlineAtom from "../atoms/HeadlineAtom.vue";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

const props = defineProps<{
  headline: string;
  submitLabel: string;
  loading?: boolean;
  submitLoading?: boolean;
  disabled?: boolean;
  initialValue?: CreateAccountDto;
  notFound?: boolean;
}>();

const emit = defineEmits<{
  submit: [value: CreateAccountDto];
  delete: [];
}>();

const { t } = useI18n();

const state = ref<CreateAccountDto>({
  name: "",
  value: NaN,
  notes: "",
});

watchEffect(() => {
  if (!props.initialValue) return;
  state.value = { ...props.initialValue };
});

const hasDataChanged = computed(() => {
  return (
    state.value.name.trim() !== props.initialValue?.name ||
    state.value.value !== props.initialValue?.value ||
    state.value.notes !== props.initialValue.notes
  );
});

const rules = computed<FormValidation<UnwrapRef<typeof state>>>(() => ({
  name: [
    { required: true, message: t("validations.required") },
    { max: 64, message: t("validations.maxLength", { max: 64 }) },
  ],
  value: [
    { required: true, message: t("validations.required") },
    { type: "number", message: t("validations.number") },
  ],
  notes: [{ max: 512, message: t("validations.maxLength", { max: 512 }) }],
}));

const formRef = ref<FormInstance | null>(null);

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (!valid) return;
    emit("submit", { ...state.value, name: state.value.name.trim() });
  });
};
</script>

<template>
  <div>
    <HeaderOrganism :headline="headline" />

    <div class="page__content">
      <el-empty v-if="notFound" :description="t('account.notFound')" />

      <template v-else>
        <HeadlineAtom v-if="initialValue" :headline="initialValue?.name">
          <el-popconfirm
            :title="
              t('account.deleteConfirmation', { name: initialValue.name })
            "
            :cancel-button-text="t('global.no')"
            :confirm-button-text="t('global.delete')"
            confirm-button-type="danger"
            :width="300"
            :icon="Warning"
            @confirm="emit('delete')"
          >
            <template #reference>
              <el-button type="danger" plain :disabled="disabled">
                {{ t("global.delete") }}
              </el-button>
            </template>
          </el-popconfirm>
        </HeadlineAtom>

        <el-form
          ref="formRef"
          v-loading="loading"
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
            <el-form-item :label="t('account.name')" prop="name">
              <el-input
                v-model="state.name"
                :prefix-icon="Wallet"
                name="name"
                :maxlength="64"
                show-word-limit
              />
            </el-form-item>

            <el-form-item :label="t('account.value')" prop="value">
              <el-input-number
                v-model="state.value"
                :step="1"
                :precision="2"
                :value-on-clear="NaN"
              />
            </el-form-item>
          </div>

          <el-form-item :label="t('account.notes')" prop="notes">
            <el-input
              v-model="state.notes"
              name="notes"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 16 }"
              :maxlength="512"
              show-word-limit
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              :loading="submitLoading"
              :disabled="disabled || !hasDataChanged"
              @click="handleSubmit"
            >
              {{ submitLabel }}
            </el-button>
          </el-form-item>
        </el-form>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-input-number {
  width: 100%;
}
</style>
