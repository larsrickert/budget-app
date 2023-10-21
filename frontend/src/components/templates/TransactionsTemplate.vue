<script lang="ts" setup>
import {
  TRANSACTION_TYPES,
  type TransactionDto,
  type TransactionType,
} from "@/composables/use-transaction";
import type { VueProps } from "@/types/vue";
import { useVModel } from "@vueuse/core";
import { ElAlert, ElButton, ElEmpty, ElTabPane, ElTabs } from "element-plus";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import FinanceItemListOrganism from "../organisms/FinanceItemListOrganism.vue";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";
import OverdueTransactionDialogOrganism from "../organisms/OverdueTransactionDialogOrganism.vue";

const props = withDefaults(
  defineProps<{
    /** @default outcome */
    type?: TransactionType;
    transactions: VueProps<typeof FinanceItemListOrganism>["items"];
    loading?: boolean;
    currentPage?: number;
    pageCount?: number;
    totals: Record<TransactionType, number>;
    overdueTransactions?: TransactionDto[];
    overdueLoading?: boolean;
  }>(),
  {
    type: "outcome",
  },
);

const emit = defineEmits<{
  itemClick: [id: string];
  "update:type": [value: TransactionType];
  "update:currentPage": [value: number];
  editOverdue: [transactionIds: string[]];
}>();

const { t } = useI18n();

const typeModel = useVModel(props, "type", emit);
const currentPageModel = useVModel(props, "currentPage", emit);
TRANSACTION_TYPES;

const isOverdueDialogOpen = ref(false);

watch(
  () => props.overdueTransactions,
  () => (isOverdueDialogOpen.value = false),
);
</script>

<template>
  <div>
    <HeaderOrganism :headline="t('transactions.pageName')" />

    <div class="page__content">
      <template v-if="props.overdueTransactions?.length">
        <el-alert
          class="overdue-alert"
          type="info"
          :title="
            t('transactions.overdue.title', props.overdueTransactions.length)
          "
          show-icon
        >
          <div class="overdue-alert__content">
            {{
              t(
                "transactions.overdue.description",
                props.overdueTransactions.length,
              )
            }}

            <el-button type="info" plain @click="isOverdueDialogOpen = true">
              {{ t("transactions.overdue.button") }}
            </el-button>
          </div>
        </el-alert>

        <OverdueTransactionDialogOrganism
          v-model:visible="isOverdueDialogOpen"
          :transactions="props.overdueTransactions"
          :loading="props.overdueLoading"
          @select="emit('editOverdue', $event)"
        />
      </template>

      <el-tabs v-model="typeModel">
        <el-tab-pane
          v-for="_type of TRANSACTION_TYPES"
          :key="_type"
          :label="`${t(`global.${_type}`, 2)} (${totals[_type]})`"
          :name="_type"
        />
      </el-tabs>

      <section>
        <FinanceItemListOrganism
          v-if="transactions.length || loading"
          v-model:current-page="currentPageModel"
          :items="transactions"
          :skeleton-count="loading ? 3 : 0"
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

.overdue-alert {
  margin-bottom: var(--app-space-2);

  :deep(.el-alert__title) {
    font-size: var(--el-font-size-base);
  }

  &__content {
    font-size: var(--el-font-size-base);
    display: flex;
    flex-wrap: wrap;
    gap: var(--app-space-2);
    align-items: center;
  }
}
</style>
