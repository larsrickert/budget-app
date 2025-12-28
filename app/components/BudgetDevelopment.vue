<script lang="ts" setup>
const props = defineProps<{
  data?: BudgetDevelopment;
  skeleton?: boolean;
}>();
</script>

<template>
  <OnyxCard>
    <div class="header">
      <span> {{ $t("statistics.budgetDevelopment.available.label") }}:</span>

      <OnyxSkeleton v-if="props.skeleton" class="header__skeleton" />

      <template v-else>
        <span
          class="header__value"
          :class="{
            'header__value--danger': props.data && props.data.min.budget < 0,
          }"
        >
          {{ $n(props.data?.min.budget ?? 0, "currency") }}
        </span>

        <OnyxInfoTooltip
          class="header__tooltip"
          :text="
            $t('statistics.budgetDevelopment.available.tooltip', {
              n: $n(props.data?.min.budget ?? 0, 'currency'),
            })
          "
          trigger="hover"
        />
      </template>
    </div>

    <OnyxEmpty v-if="!props.data || props.data.items.length < 2" class="empty">
      {{ $t("statistics.budgetDevelopment.empty") }}
    </OnyxEmpty>

    <BudgetDevelopmentChart v-else :items="props.data?.items ?? []" :loading="props.skeleton" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-xs);
  margin-bottom: var(--onyx-density-md);

  &__tooltip {
    display: flex;
    :deep(.onyx-tooltip-wrapper) {
      display: inherit;
    }
  }

  &__value {
    color: var(--onyx-color-text-icons-neutral-medium);

    &--danger {
      color: var(--onyx-color-text-icons-danger-intense);
    }
  }

  &__skeleton {
    width: 4rem;
    height: 1.25rem;
  }
}

.empty {
  margin-inline: auto;
}
</style>
