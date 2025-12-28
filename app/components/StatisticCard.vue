<script lang="ts" setup>
import type { OnyxColor } from "sit-onyx";

const props = defineProps<{
  label: string;
  value: number;
  icon: string;
  color?: OnyxColor;
  skeleton?: boolean;
}>();
</script>

<template>
  <div class="statistic">
    <OnyxIcon :icon="props.icon" :color="props.color" />

    <span class="onyx-text--small statistic__label">{{ props.label }}</span>

    <OnyxSkeleton v-if="props.skeleton" class="statistic__value statistic__value--skeleton" />
    <span v-else class="onyx-text--large statistic__value">
      {{ $n(props.value, "currency") }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.statistic {
  background-color: var(--onyx-color-base-background-blank);
  width: max-content;
  box-sizing: border-box;
  padding: var(--onyx-density-md);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-200);
  border-radius: var(--onyx-radius-sm) var(--onyx-radius-lg);
  min-width: 10rem;

  display: flex;
  flex-direction: column;

  &__value {
    font-weight: 600;

    &--skeleton {
      height: 1.5rem;
      width: 4rem;
      margin-bottom: var(--onyx-density-4xs);
    }
  }

  &__label {
    color: var(--onyx-color-text-icons-neutral-soft);
    margin-top: var(--onyx-density-3xs);
  }
}
</style>
