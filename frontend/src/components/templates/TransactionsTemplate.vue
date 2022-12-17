<script lang="ts" setup>
import {
  TRANSACTION_TYPES,
  type TransactionType,
} from "@/composables/use-transaction";
import type { VueProps } from "@/types/vue";
import { useVModel } from "@vueuse/core";
import { ElEmpty, ElTabPane, ElTabs } from "element-plus";
import { useI18n } from "vue-i18n";
import FinanceItemListOrganism from "../organisms/FinanceItemListOrganism.vue";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

const props = withDefaults(
  defineProps<{
    /** @default outcome */
    type?: TransactionType;
    transactions: VueProps<typeof FinanceItemListOrganism>["items"];
    loading?: boolean;
    currentPage?: number;
    pageCount?: number;
    totals: Record<TransactionType, number>;
  }>(),
  {
    type: "outcome",
  }
);

const emit = defineEmits<{
  (event: "itemClick", id: string): void;
  (event: "update:type", value: TransactionType): void;
  (event: "update:currentPage", value: number): void;
}>();

const { t } = useI18n();

const typeModel = useVModel(props, "type", emit);
const currentPageModel = useVModel(props, "currentPage", emit);
TRANSACTION_TYPES;
</script>

<template>
  <div>
    <HeaderOrganism :headline="t('transactions.pageName')" />

    <div class="page__content">
      <el-tabs v-model="typeModel">
        <el-tab-pane
          v-for="type of TRANSACTION_TYPES"
          :key="type"
          :label="`${t(`global.${type}`, 2)} (${totals[type]})`"
          :name="type"
        />
      </el-tabs>

      <section>
        <FinanceItemListOrganism
          v-if="transactions.length || loading"
          :items="transactions"
          :skeleton-count="loading ? 3 : 0"
          v-model:current-page="currentPageModel"
          :page-count="pageCount"
          :disabled="loading"
          @item-click="emit('itemClick', $event.id)"
        />

        <el-empty
          v-else
          :description="t('transactions.noItems')"
          class="empty"
        />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  --el-empty-padding: 0 0 var(--app-space-3) 0;
}
</style>
