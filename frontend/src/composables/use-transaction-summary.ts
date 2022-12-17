import client from "@/pocketbase";
import { ref, watch, type Ref } from "vue";

export interface TransactionSummaryItem {
  monthlyTotal: number;
}

export interface TransactionSummary {
  income: TransactionSummaryItem;
  outcome: TransactionSummaryItem;
  monthlyBudget: number;
  budgetPercentageOfIncome: number;
}

export interface UseTransactionSummaryOptions {
  initialFetch?: boolean;
}

export const useTransactionSummary = (
  userId: Ref<string | undefined>,
  options?: UseTransactionSummaryOptions
) => {
  const summary = ref<TransactionSummary>();
  const isLoading = ref(false);

  const fetch = async () => {
    if (!userId.value || isLoading.value) return;

    isLoading.value = true;
    try {
      summary.value = await client.send(
        `api/collections/users/records/${userId.value}/summary/transactions`,
        {}
      );
    } finally {
      isLoading.value = false;
    }
  };

  watch(userId, fetch, { immediate: options?.initialFetch });

  return { summary, fetch, isLoading };
};
