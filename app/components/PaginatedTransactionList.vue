<script lang="ts" setup>
import type { FinanceListItem } from "./FinanceList.vue";

const props = defineProps<{
  icon: string;
  list?: PaginatedList<Transaction>;
  skeleton?: boolean;
}>();

const { d } = useI18n();

const page = defineModel<number>("page", { default: 1 });

const items = computed(() => {
  return props.list?.items.map<FinanceListItem>((item) => ({
    ...item,
    description: item.bookingDate ? d(item.bookingDate, "date") : undefined,
  }));
});

const pages = computed(() => props.list?.pages ?? 1);
</script>

<template>
  <div class="wrapper">
    <FinanceList
      :items="items ?? []"
      :skeleton="props.skeleton"
      :icon="props.icon"
      link="/transactions"
    />
    <OnyxPagination v-if="pages > 1" v-model="page" :pages :skeleton="props.skeleton" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);
}
</style>
