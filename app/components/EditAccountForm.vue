<script lang="ts" setup>
const props = defineProps<{
  account?: Account;
  skeleton?: boolean;
  loading?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  submit: [account: NewAccount];
}>();

defineSlots<{
  actions?(): unknown;
}>();

const state = ref<Partial<NewAccount>>({ ...props.account });
watchEffect(() => {
  state.value = { ...props.account };
});

const handleSubmit = () => {
  const account = state.value as NewAccount;
  emit("submit", { ...account });
};
</script>

<template>
  <OnyxForm
    class="onyx-grid"
    :disabled="props.loading || props.disabled"
    :skeleton="props.skeleton"
    @submit.prevent="handleSubmit"
  >
    <OnyxInput
      v-model="state.name"
      class="onyx-grid-span-4"
      :label="$t('name')"
      :maxlength="255"
      :autofocus="!props.account"
      autocomplete="off"
      required
    />

    <OnyxStepper
      v-model="state.value"
      class="onyx-grid-span-4"
      :label="$t('value')"
      required
      :precision="2"
      :format-number="(value) => $n(value, 'currency')"
    />

    <TextEditor v-model="state.notes" class="onyx-grid-span-8" :label="$t('notes')" />

    <div class="onyx-grid-span-full actions">
      <OnyxButton
        :label="$t(props.account ? 'save' : 'create')"
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
