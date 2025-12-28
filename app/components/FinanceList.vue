<script lang="ts" setup>
export type FinanceListItem = {
  id: number;
  name: string;
  value: number;
  description?: string;
};

const props = defineProps<{
  items: FinanceListItem[];
  icon: string;
  /**
   * Link. ID will be appended.
   */
  link: string;
  skeleton?: boolean;
}>();

const localePath = useLocalePath();
</script>

<template>
  <OnyxEmpty v-if="!props.items.length && !props.skeleton">
    {{ $t("noData") }}
  </OnyxEmpty>

  <ul class="list">
    <template v-if="props.skeleton">
      <FinanceListItem v-for="i in 3" :key="i" :skeleton="true" />
    </template>

    <template v-else>
      <OnyxRouterLink
        v-for="item in props.items"
        :key="item.id"
        class="list__link"
        :href="localePath(`${props.link}/${item.id}`)"
      >
        <FinanceListItem v-bind="item" :icon="props.icon" />
      </OnyxRouterLink>
    </template>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xs);

  &__link {
    &:hover {
      color: var(--onyx-color-text-icons-primary-intense);
    }

    &:active {
      color: var(--onyx-color-text-icons-primary-bold);
    }

    &:focus-visible {
      color: var(--onyx-color-text-icons-primary-intense);
      border-radius: var(--onyx-radius-sm);
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }
  }
}
</style>
