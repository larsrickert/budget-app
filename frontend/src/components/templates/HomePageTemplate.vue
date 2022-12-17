<script lang="ts" setup>
import type { BudgetDevelopment } from "@/composables/use-budget-development";
import type { TransactionSummary } from "@/composables/use-transaction-summary";
import type { VueProps } from "@/types/vue";
import { Money, PriceTag } from "@element-plus/icons-vue";
import { useVModel } from "@vueuse/core";
import { ElContainer, ElDivider, ElEmpty } from "element-plus";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import HeadlineAtom from "../atoms/HeadlineAtom.vue";
import HelpAtom from "../atoms/HelpAtom.vue";
import LineChartAtom from "../atoms/LineChartAtom.vue";
import TileMolecule from "../molecules/TileMolecule.vue";
import FinanceItemListOrganism from "../organisms/FinanceItemListOrganism.vue";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

const props = defineProps<{
  modelValue?: unknown;
  accounts: VueProps<typeof FinanceItemListOrganism>["items"];
  currentAccountPage?: number;
  accountPageCount?: number;
  isAccountsLoading?: boolean;
  transactionSummary?: TransactionSummary;
  isTransactionSummaryLoading?: boolean;
  budgetDevelopment?: Pick<BudgetDevelopment, "items" | "min">;
  isBudgetDevelopmentLoading?: boolean;
}>();

const emit = defineEmits<{
  (event: "itemClick", id: string): void;
  (event: "update:currentAccountPage", value: number): void;
}>();

const { t, n, d } = useI18n();

const chartItems = computed<VueProps<typeof LineChartAtom>["items"]>(() => {
  if (!props.budgetDevelopment) return [];
  return props.budgetDevelopment.items.map((item) => {
    return {
      label: d(item.date, "date"),
      value: item.budget,
      tooltipLabel: n(item.budget, "currency"),
    };
  });
});

const currentAccountPage = useVModel(props, "currentAccountPage", emit);
</script>

<template>
  <div>
    <HeaderOrganism :headline="t('home.pageName')" />

    <div class="page__content">
      <section>
        <HeadlineAtom :headline="t('global.accounts', 2)" />

        <FinanceItemListOrganism
          v-if="accounts.length || isAccountsLoading"
          :items="accounts"
          :skeleton-count="isAccountsLoading ? 3 : 0"
          v-model:current-page="currentAccountPage"
          :page-count="accountPageCount"
          :disabled="isAccountsLoading"
          @item-click="emit('itemClick', $event.id)"
        />

        <el-empty v-else :description="t('home.noAccounts')" class="empty" />
      </section>

      <el-divider border-style="dashed" />

      <section>
        <HeadlineAtom :headline="t('home.monthly.headline')" />

        <div class="tiles">
          <TileMolecule
            :title="n(transactionSummary?.income.monthlyTotal ?? 0, 'currency')"
            :subtitle="t('global.income', 2)"
            :icon="Money"
            color="success"
            :loading="isTransactionSummaryLoading"
          />
          <TileMolecule
            :title="
              n(transactionSummary?.outcome.monthlyTotal ?? 0, 'currency')
            "
            :subtitle="t('global.outcome', 2)"
            :icon="PriceTag"
            color="danger"
            :loading="isTransactionSummaryLoading"
          />
          <TileMolecule
            :title="n(transactionSummary?.monthlyBudget ?? 0, 'currency')"
            :subtitle="t('home.monthly.budget')"
            :loading="isTransactionSummaryLoading"
            :percentage="transactionSummary?.budgetPercentageOfIncome ?? 0"
          />
        </div>
      </section>

      <el-divider border-style="dashed" />

      <section>
        <HeadlineAtom :headline="t('home.chart.headline')" />

        <el-container
          v-if="chartItems.length > 1 || isBudgetDevelopmentLoading"
          v-loading="isBudgetDevelopmentLoading"
          direction="vertical"
        >
          <div class="chart__help">
            <span>
              {{ t("home.chart.availableBudget") }}:
              {{ n(budgetDevelopment?.min.budget ?? 0, "currency") }}
            </span>

            <HelpAtom
              :content="
                t('home.chart.availableBudgetHelpText', {
                  value: n(budgetDevelopment?.min.budget ?? 0, 'currency'),
                })
              "
            />
          </div>

          <LineChartAtom
            :items="chartItems"
            :y-ticks-formatter="(value) => n(value, 'currencyShort')"
            :max-x-ticks="12"
            class="chart"
          />
        </el-container>

        <el-empty v-else :description="t('home.chart.noItems')" class="empty" />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  --el-empty-padding: 0 0 var(--app-space-3) 0;
}

.tiles {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: var(--app-space-1);
  margin: calc(-1 * var(--app-space-1));
  margin-top: 0;
  overflow-x: auto;

  .tile {
    min-width: 128px;
  }
}

.chart {
  margin-top: var(--app-space-2);
  max-height: 500px;
  width: 100%;

  &__help {
    display: flex;
    align-items: center;
    gap: var(--app-space-2);
  }
}
</style>
