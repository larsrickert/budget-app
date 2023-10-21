<script lang="ts" setup>
import FloatingButtonAtom from "@/components/atoms/FloatingButtonAtom.vue";
import TransactionsTemplate from "@/components/templates/TransactionsTemplate.vue";
import { usePagination } from "@/composables/use-pagination";
import type {
  TransactionDto,
  TransactionType,
} from "@/composables/use-transaction";
import client from "@/pocketbase";
import type { VueProps } from "@/types/vue";
import { getNextFrequencyDate } from "@/utils/dates";
import { showToast } from "@/utils/io";
import { CreditCard } from "@element-plus/icons-vue";
import { useAsyncState } from "@vueuse/core";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { t, n, d } = useI18n();

const currentType = ref<TransactionType>("outcome");

const sort = "bookingDate,-value,name" as const;

const incomePagination = usePagination<TransactionDto>("transactions", {
  query: {
    sort,
    $autoCancel: false,
    filter: 'type = "income"',
  },
});

const outcomePagination = usePagination<TransactionDto>("transactions", {
  query: {
    sort,
    $autoCancel: false,
    filter: 'type = "outcome"',
  },
});

const pagination = computed(() =>
  currentType.value === "income" ? incomePagination : outcomePagination,
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

const handleItemClick = async (id: string) => {
  await router.push(`/transactions/${id}`);
};

const handleFabClick = async () => {
  await router.push({
    path: "transactions/new",
    query: { type: currentType.value },
  });
};

const { state: overdueTransactions, execute: refetchOverdue } =
  useAsyncState(async () => {
    const date = new Date();
    date.setHours(23, 59, 59);

    const list = await client
      .collection("transactions")
      .getList<TransactionDto>(1, Number.MAX_SAFE_INTEGER, {
        filter: `bookingDate != "" && bookingDate <= "${date.toISOString()}"`,
        sort,
      });

    return list.items;
  }, []);

const isOverdueLoading = ref(false);

const handleEditOverdue = async (ids: string[]) => {
  const transactions = overdueTransactions.value.filter((transaction) =>
    ids.includes(transaction.id),
  );
  if (!transactions.length) return;

  isOverdueLoading.value = true;

  const results = await Promise.allSettled(
    transactions.map((transaction) => {
      return client.collection("transactions").update(transaction.id, {
        bookingDate: getNextFrequencyDate(
          transaction.bookingDate,
          transaction.frequency,
        ),
      });
    }),
  );

  const hasError = results.some((i) => i.status === "rejected");

  if (hasError) {
    showToast({
      message: t("transactions.overdue.error", transactions.length),
      duration: 3000,
      type: "error",
    });
  } else {
    showToast({
      message: t("transactions.overdue.success", transactions.length),
      duration: 3000,
      type: "success",
    });
  }

  isOverdueLoading.value = false;

  await Promise.allSettled([pagination.value.refetch(), refetchOverdue()]);
};
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
      :overdue-transactions="overdueTransactions"
      :overdue-loading="isOverdueLoading"
      @item-click="handleItemClick"
      @edit-overdue="handleEditOverdue"
    />

    <FloatingButtonAtom
      :tooltip-text="t('transactions.fabTooltip')"
      @click="handleFabClick"
    />
  </div>
</template>
