<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { ElButton, ElDialog } from "element-plus";

const props = withDefaults(
  defineProps<{
    title: string;
    /** will be overridden when slot is used */
    description?: string;
    modelValue?: boolean;
    cancelText: string;
    confirmText: string;
    disabled?: boolean;
    loading?: boolean;
    /** @default true */
    showActions?: boolean;
  }>(),
  {
    showActions: true,
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "confirm", close: () => void): void;
}>();

const isOpen = useVModel(props, "modelValue", emit);

const handleConfirm = () => {
  emit("confirm", () => (isOpen.value = false));
};
</script>

<template>
  <el-dialog
    v-model="isOpen"
    :title="title"
    width="600px"
    align-center
    destroy-on-close
    :show-close="!loading"
    :close-on-click-modal="!loading"
    :close-on-press-escape="!loading"
    class="confirm-dialog"
  >
    <slot>{{ description }}</slot>

    <template #footer v-if="showActions">
      <el-button @click="isOpen = false" :disabled="loading">
        {{ cancelText }}
      </el-button>
      <el-button
        type="primary"
        @click="handleConfirm"
        :disabled="disabled"
        :loading="loading"
      >
        {{ confirmText }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
:global(.confirm-dialog) {
  max-width: 95%;
}
</style>
