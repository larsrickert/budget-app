<script lang="ts" setup>
import type { SelectOption } from "sit-onyx";

const props = defineProps<{
  type: TransactionType;
  transaction?: Transaction;
  skeleton?: boolean;
  loading?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  submit: [transaction: NewTransaction];
}>();

defineSlots<{
  actions?(): unknown;
}>();

const { t } = useI18n();

const state = ref<Partial<NewTransaction> & Pick<NewTransaction, "type">>({
  ...props.transaction,
  type: props.type,
});
watch(
  () => props.transaction,
  () => (state.value = { type: props.type, ...props.transaction }),
);
watch(
  () => props.type,
  () => (state.value.type = props.type),
);

const getValue = (value: number) => getTransactionValue(state.value.type, value);

watch(
  () => state.value.type,
  () => {
    if (!state.value.value) return;
    state.value.value = getValue(state.value.value);
  },
);

watch(
  () => state.value.frequency,
  (newFrequency) => {
    if (!newFrequency) state.value.endDate = undefined;
  },
);

const handleSubmit = () => {
  const transaction = state.value as NewTransaction;
  emit("submit", { ...transaction });
};

const typeOptions = computed(() => {
  return [
    { value: "outcome", label: t("transactions.outcome") },
    { value: "income", label: t("transactions.income") },
  ] satisfies SelectOption[];
});

const gridSpan = "onyx-grid-span-4 onyx-grid-md-span-6";

const frequencyOptions = computed(() => {
  return [
    { value: 0, label: t("transactions.frequencies.none") },
    { value: 1, label: t("transactions.frequencies.monthly") },
    { value: 3, label: t("transactions.frequencies.quarterly") },
    { value: 6, label: t("transactions.frequencies.semiannual") },
    { value: 12, label: t("transactions.frequencies.annual") },
    { value: 24, label: t("transactions.frequencies.biennial") },
  ] satisfies SelectOption[];
});
</script>

<template>
  <OnyxForm
    class="onyx-grid"
    :disabled="props.loading || props.disabled"
    :skeleton="props.skeleton"
    @submit.prevent="handleSubmit"
  >
    <OnyxSegmentedControl v-model="state.type" class="onyx-grid-span-full" :options="typeOptions" />

    <OnyxInput
      v-model="state.name"
      :class="gridSpan"
      :label="$t('name')"
      :maxlength="255"
      :autofocus="!props.transaction"
      autocomplete="off"
      required
    />

    <OnyxStepper
      :model-value="state.value"
      :class="gridSpan"
      :label="$t('value')"
      required
      :precision="2"
      :format-number="(value) => $n(value, 'currency')"
      inputmode="decimal"
      @update:model-value="state.value = $event != undefined ? getValue($event) : undefined"
    />

    <OnyxDatePicker
      :model-value="state.bookingDate"
      :class="gridSpan"
      :label="$t('transactions.bookingDate')"
      @update:model-value="state.bookingDate = $event?.toString()"
    />

    <OnyxSelect
      :model-value="state.frequency"
      :class="gridSpan"
      :label="$t('transactions.frequency')"
      :list-label="$t('transactions.availableFrequency')"
      :options="frequencyOptions"
      :placeholder="$t('transactions.frequencies.none')"
      @update:model-value="state.frequency = $event || null"
    />

    <OnyxDatePicker
      v-if="state.frequency"
      :model-value="state.endDate"
      :class="gridSpan"
      :label="$t('transactions.endDate.label')"
      :label-tooltip="$t('transactions.endDate.info')"
      @update:model-value="state.endDate = $event?.toString()"
    />

    <OnyxTextarea
      v-model="state.notes"
      class="onyx-grid-span-full"
      :label="$t('notes')"
      :maxlength="2048"
      with-counter
    />

    <div class="onyx-grid-span-full actions">
      <OnyxButton
        :label="$t(props.transaction ? 'save' : 'create')"
        type="submit"
        :loading="props.loading"
      />

      <slot name="actions"></slot>
    </div>
  </OnyxForm>
</template>

<style lang="scss" scoped>
:deep(.onyx-textarea-skeleton__input),
:deep(.onyx-input-skeleton__input) {
  width: 100%;
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-sm);
  flex-wrap: wrap;
}
</style>
