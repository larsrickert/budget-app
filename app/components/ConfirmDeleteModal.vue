<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";

const emit = defineEmits<{
  confirm: [];
}>();

defineSlots<{
  default(props: { trigger: object }): unknown;
}>();

const isOpen = ref(false);

const trigger = {
  onClick: () => (isOpen.value = true),
};

const handleConfirm = () => {
  emit("confirm");
  isOpen.value = false;
};
</script>

<template>
  <slot :trigger></slot>

  <OnyxAlertModal
    v-model:open="isOpen"
    :icon="{ icon: iconCircleAttention, color: 'danger' }"
    :label="$t('confirmDelete.confirm')"
  >
    {{ $t("confirmDelete.description") }}

    <template #actions>
      <OnyxButton
        :label="$t('cancel')"
        color="neutral"
        mode="plain"
        autofocus
        @click="isOpen = false"
      />
      <OnyxButton :label="$t('delete')" color="danger" @click="handleConfirm" />
    </template>
  </OnyxAlertModal>
</template>
