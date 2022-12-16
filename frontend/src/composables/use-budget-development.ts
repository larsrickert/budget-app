import client from "@/pocketbase";
import { ref, watch, type Ref } from "vue";

export interface BudgetDevelopmentItem {
  date: string;
  budget: number;
}

export interface BudgetDevelopment {
  min: BudgetDevelopmentItem;
  max: BudgetDevelopmentItem;
  onetimeTotal: number;
  items: BudgetDevelopmentItem[];
}

export interface UseBudgetDevelopmentOptions {
  includePast?: boolean;
  checkLength?: number;
  initialFetch?: boolean;
}

export const useBudgetDevelopment = (
  userId: Ref<string | undefined>,
  options?: UseBudgetDevelopmentOptions
) => {
  const budgetDevelopment = ref<BudgetDevelopment>();
  const isLoading = ref(false);

  const fetch = async () => {
    if (!userId.value || isLoading.value) return;
    isLoading.value = true;

    const queryParams: Record<string, unknown> = {};
    if (options?.includePast != null)
      queryParams.includePast = options.includePast;
    if (options?.checkLength != null)
      queryParams.checkLength = options.checkLength;

    try {
      budgetDevelopment.value = await client.send(
        `api/collections/users/records/${userId.value}/budget-development`,
        { params: queryParams }
      );
    } finally {
      isLoading.value = false;
    }
  };

  watch(userId, fetch, { immediate: options?.initialFetch });

  return { budgetDevelopment, fetch, isLoading };
};
