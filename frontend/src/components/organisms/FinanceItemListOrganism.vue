<script lang="ts" setup>
import type { VueProps } from "@/types/vue";
import { Minus } from "@element-plus/icons-vue";
import { useVModel } from "@vueuse/core";
import { ElPagination } from "element-plus";
import { computed } from "vue";
import FinanceItemMolecule from "../molecules/FinanceItemMolecule.vue";

export type ListItem = VueProps<typeof FinanceItemMolecule> & { id: string };

const props = withDefaults(
  defineProps<{
    items: ListItem[];
    skeletonCount?: number;
    total?: string;
    totalLabel?: string;
    currentPage?: number;
    pageCount?: number;
    disabled?: boolean;
  }>(),
  {
    skeletonCount: 0,
  },
);

const emit = defineEmits<{
  itemClick: [item: ListItem];
  "update:currentPage": [value: number];
}>();

const isSkeleton = computed(() => props.skeletonCount > 0);

const currentPageModel = useVModel(props, "currentPage", emit);
</script>

<template>
  <div>
    <template v-if="isSkeleton">
      <FinanceItemMolecule
        v-for="i in skeletonCount"
        :key="`skeleton-${i}`"
        title=""
        value=""
        :icon="Minus"
        skeleton
      />

      <FinanceItemMolecule
        v-if="total != null"
        title=""
        value=""
        hide-arrow
        skeleton
        class="total"
      />
    </template>

    <template v-else>
      <FinanceItemMolecule
        v-for="item in items"
        v-bind="item"
        :key="item.id"
        @click="emit('itemClick', item)"
      />

      <FinanceItemMolecule
        v-if="total != null"
        :title="totalLabel ?? ''"
        :value="total"
        hide-arrow
        class="total"
      />

      <el-pagination
        v-model:current-page="currentPageModel"
        layout="prev, pager, next"
        :page-count="pageCount"
        background
        hide-on-single-page
        :disabled="disabled"
        class="pagination"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  margin-top: var(--app-space-2);
}
</style>
