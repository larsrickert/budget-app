<script lang="ts" setup>
import type { VueProps } from "@/types/vue";
import { Minus } from "@element-plus/icons-vue";
import { computed } from "vue";
import FinanceItemMolecule from "../molecules/FinanceItemMolecule.vue";

export type ListItem = VueProps<typeof FinanceItemMolecule> & { id: string };

const props = withDefaults(
  defineProps<{
    items: ListItem[];
    skeletonCount?: number;
    total?: string;
    totalLabel?: string;
  }>(),
  {
    skeletonCount: 0,
  }
);

const emit = defineEmits<{
  (event: "itemClick", item: ListItem): void;
}>();

const isSkeleton = computed(() => props.skeletonCount > 0);
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
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
