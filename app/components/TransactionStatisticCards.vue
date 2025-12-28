<script lang="ts" setup>
import { iconBag, iconCash, iconChartPie1 } from "@sit-onyx/icons";

const props = defineProps<{
  statistics?: TransactionStatistics;
  skeleton?: boolean;
}>();
</script>

<template>
  <div class="statistics">
    <StatisticCard
      :icon="iconCash"
      :value="statistics?.income.monthlyTotal ?? 0"
      :label="$t('statistics.income')"
      color="success"
      :skeleton="props.skeleton"
    />
    <StatisticCard
      :icon="iconBag"
      :value="statistics?.outcome.monthlyTotal ?? 0"
      :label="$t('statistics.outcome')"
      color="danger"
      :skeleton="props.skeleton"
    />
    <StatisticCard
      :icon="iconChartPie1"
      :value="statistics?.monthlyBudget ?? 0"
      :label="$t('statistics.balance')"
      :skeleton="props.skeleton"
    />
  </div>
</template>

<style lang="scss" scoped>
.statistics {
  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-md);
  overflow-x: auto;
}
</style>
