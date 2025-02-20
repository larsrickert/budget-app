<script lang="ts" setup>
import {
  TRANSACTION_TYPES,
  TransactionFrequency,
  type CreateTransactionDto,
  type TransactionType,
} from "@/composables/use-transaction";
import type { FormValidation } from "@/types/vue";
import { getNextFrequencyDate } from "@/utils/dates";
import { Refresh, Wallet, Warning } from "@element-plus/icons-vue";
import {
  ElButton,
  ElDatePicker,
  ElEmpty,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElOption,
  ElPopconfirm,
  ElRadioButton,
  ElRadioGroup,
  ElSelect,
  type FormInstance,
} from "element-plus";
import {
  computed,
  nextTick,
  ref,
  toRaw,
  watch,
  watchEffect,
  type UnwrapRef,
} from "vue";
import { useI18n } from "vue-i18n";
import HeadlineAtom from "../atoms/HeadlineAtom.vue";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

const props = withDefaults(
  defineProps<{
    headline: string;
    submitLabel: string;
    loading?: boolean;
    submitLoading?: boolean;
    disabled?: boolean;
    initialValue?: CreateTransactionDto;
    notFound?: boolean;
    /** Initial type to set when no initial value is given. @default outcome */
    initialType?: TransactionType;
  }>(),
  {
    initialType: "outcome",
  },
);

const emit = defineEmits<{
  submit: [value: CreateTransactionDto];
  delete: [];
}>();

const { t, locale } = useI18n();

const state = ref<CreateTransactionDto>({
  name: "",
  value: NaN,
  notes: "",
  type: toRaw(props.initialType),
  bookingDate: "",
  frequency: TransactionFrequency.NONE,
});

const bookingDateModel = computed({
  get: () =>
    state.value.bookingDate ? new Date(state.value.bookingDate) : undefined,
  set: (value) => {
    state.value.bookingDate = value?.toISOString() ?? "";
  },
});

watchEffect(() => {
  if (!props.initialValue) return;
  state.value = { ...props.initialValue };
});

const hasDataChanged = computed(() => {
  return (
    state.value.name.trim() !== props.initialValue?.name ||
    state.value.value !== props.initialValue?.value ||
    state.value.notes !== props.initialValue.notes ||
    state.value.type !== props.initialValue.type ||
    state.value.bookingDate !== props.initialValue.bookingDate ||
    state.value.frequency !== props.initialValue.frequency
  );
});

const MAX_NOTES_LENGTH = 2056 as const;

const rules = computed<FormValidation<UnwrapRef<typeof state>>>(() => ({
  name: [
    { required: true, message: t("validations.required") },
    { max: 64, message: t("validations.maxLength", { max: 64 }) },
  ],
  value: [
    { required: true, message: t("validations.required") },
    { type: "number", message: t("validations.number") },
  ],
  notes: [
    {
      max: MAX_NOTES_LENGTH,
      message: t("validations.maxLength", { max: MAX_NOTES_LENGTH }),
    },
  ],
  type: [
    { required: true, message: t("validations.required") },
    {
      type: "enum",
      enum: [...TRANSACTION_TYPES],
      message: t("validations.enum"),
    },
  ],
  bookingDate: [{ type: "date", message: t("validations.date") }],
  frequency: [
    {
      type: "enum",
      enum: Object.values(TransactionFrequency),
      message: t("validations.enum"),
    },
  ],
}));

const formRef = ref<FormInstance | null>(null);

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (!valid) return;
    const absValue = Math.abs(state.value.value);
    emit("submit", {
      ...state.value,
      name: state.value.name.trim(),
      value: state.value.type === "income" ? absValue : -absValue,
    });
  });
};

const now = new Date();
now.setHours(0, 0, 0, 0);

const isDateDisabled = (date: Date) => {
  return date.getTime() < now.getTime();
};

const shortcuts = computed(() => {
  if (!state.value.frequency || !state.value.bookingDate) return [];

  const key =
    Object.keys(TransactionFrequency)[
      Object.values(TransactionFrequency).indexOf(state.value.frequency)
    ];

  const date = getNextFrequencyDate(
    state.value.bookingDate,
    state.value.frequency,
  );

  return [
    {
      text: t(`transaction.dateShortcuts.${key.toLowerCase()}`),
      value: date,
    },
  ];
});

// workaround to make datepicker shortcuts reactive
// check element-plus issue and remove workaround if fixed: https://github.com/element-plus/element-plus/issues/3879
const forceDatePickerRerender = ref(false);
watch(shortcuts, async () => {
  forceDatePickerRerender.value = true;
  await nextTick();
  forceDatePickerRerender.value = false;
});
</script>

<template>
  <div>
    <HeaderOrganism :headline="headline" />

    <div class="page__content">
      <el-empty v-if="notFound" :description="t('transaction.notFound')" />

      <template v-else>
        <HeadlineAtom v-if="initialValue" :headline="initialValue?.name">
          <el-popconfirm
            :title="
              t('transaction.deleteConfirmation', { name: initialValue.name })
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
          <el-form-item :label="t('transaction.type')" prop="type">
            <el-radio-group v-model="state.type" name="type">
              <el-radio-button
                v-for="type in TRANSACTION_TYPES"
                :key="type"
                :label="type"
              >
                {{ t(`global.${type}`) }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>

          <div class="grid grid--2">
            <el-form-item :label="t('transaction.name')" prop="name">
              <el-input
                v-model="state.name"
                :prefix-icon="Wallet"
                name="name"
                :maxlength="64"
                show-word-limit
              />
            </el-form-item>

            <el-form-item :label="t('transaction.value')" prop="value">
              <el-input-number
                v-model="state.value"
                :step="1"
                :precision="2"
                :value-on-clear="NaN"
              />
            </el-form-item>
          </div>

          <div class="grid grid--2">
            <el-form-item
              :label="t('transaction.bookingDate')"
              prop="bookingDate"
            >
              <el-date-picker
                v-if="!forceDatePickerRerender"
                v-model="bookingDateModel"
                name="bookingDate"
                :disabled-date="isDateDisabled"
                :format="locale === 'de' ? 'DD.MM.YYYY' : undefined"
                :shortcuts="shortcuts"
              />
            </el-form-item>

            <el-form-item :label="t('transaction.frequency')" prop="frequency">
              <el-select
                v-model="state.frequency"
                clearable
                filterable
                name="frequency"
                class="el-select--full-width"
              >
                <el-option
                  v-for="[key, value] in Object.entries(TransactionFrequency)"
                  :key="key"
                  :label="t(`transaction.frequencies.${key.toLowerCase()}`)"
                  :value="value"
                />

                <template #prefix>
                  <el-icon> <Refresh /> </el-icon>
                </template>
              </el-select>
            </el-form-item>
          </div>

          <el-form-item :label="t('transaction.notes')" prop="notes">
            <el-input
              v-model="state.notes"
              name="notes"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 16 }"
              :maxlength="MAX_NOTES_LENGTH"
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
