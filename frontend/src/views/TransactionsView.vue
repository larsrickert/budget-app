<script lang="ts" setup>
import FloatingButtonAtom from "@/components/atoms/FloatingButtonAtom.vue";
import TransactionsTemplate from "@/components/templates/TransactionsTemplate.vue";
import { usePagination } from "@/composables/use-pagination";
import type {
  TransactionDto,
  TransactionType,
} from "@/composables/use-transaction";
import type { VueProps } from "@/types/vue";
import { CreditCard } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { t, n, d } = useI18n();

const currentType = ref<TransactionType>("outcome");

const incomePagination = usePagination<TransactionDto>("transactions", {
  query: {
    sort: "bookingDate,-value,name",
    $autoCancel: false,
    filter: 'type = "income"',
  },
});

const outcomePagination = usePagination<TransactionDto>("transactions", {
  query: {
    sort: "bookingDate,value,name",
    $autoCancel: false,
    filter: 'type = "outcome"',
  },
});

const pagination = computed(() =>
  currentType.value === "income" ? incomePagination : outcomePagination
);

const transactions = computed<
  VueProps<typeof TransactionsTemplate>["transactions"]
>(() => {
  return pagination.value.items.value.map((i) => ({
    id: i.id,
    title: i.name,
    value: n(i.value, "currency"),
    subtitle: i.bookingDate ? d(i.bookingDate, "date") : undefined,
    icon: CreditCard,
    status: i.value < 0 ? "danger" : undefined,
  }));
});
</script>

<template>
  <div>
    <TransactionsTemplate
      v-model:type="currentType"
      v-model:current-page="pagination.currentPage.value"
      :page-count="pagination.pageCount.value"
      :loading="pagination.isLoading.value"
      :transactions="transactions"
      :totals="{
        income: incomePagination.total.value,
        outcome: outcomePagination.total.value,
      }"
    />

    <FloatingButtonAtom
      :tooltip-text="t('transactions.fabTooltip')"
      @click="router.push('/transactions/new')"
    />
  </div>
</template>
