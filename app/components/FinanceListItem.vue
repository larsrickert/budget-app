<script lang="ts" setup>
import { iconChevronRightSmall } from "@sit-onyx/icons";

export type ListItemProps = {
  name: string;
  value: number;
  icon: string;
  description?: string;
};

const props = defineProps<
  (ListItemProps & { skeleton?: false }) | (Partial<ListItemProps> & { skeleton: true })
>();
</script>

<template>
  <li class="item">
    <template v-if="!props.skeleton">
      <div class="item__name">
        <OnyxIcon class="item__icon" :icon="props.icon" />
        <div>
          <div>{{ props.name }}</div>
          <div v-if="props.description" class="onyx-text--small text--soft">
            {{ props.description }}
          </div>
        </div>
      </div>

      <div class="item__value">
        <span>{{ $n(props.value, "currency") }}</span>
        <OnyxIcon :icon="iconChevronRightSmall" />
      </div>
    </template>

    <template v-else>
      <div class="item__name">
        <OnyxSkeleton class="item__icon" style="width: 1.5rem; aspect-ratio: 1" />
        <OnyxSkeleton style="height: 1.25rem; width: 8rem" />
      </div>

      <OnyxSkeleton style="height: 1.25rem; width: 4rem" />
    </template>
  </li>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--onyx-density-lg);
  list-style: none;

  &__name {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-lg);
  }

  &__value {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-sm);
  }

  &__icon {
    background-color: var(--onyx-color-base-neutral-200);
    color: var(--onyx-color-text-icons-neutral-intense);
    border-radius: var(--onyx-radius-md);
    padding: var(--onyx-density-2xs);
    box-sizing: content-box;
  }
}
</style>
