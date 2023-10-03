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

export interface BudgetDevelopmentSettings {
  includePast?: boolean;
  checkLength?: number;
}

export const useBudgetDevelopment = (
  userId: Ref<string | undefined>,
  settings: Ref<BudgetDevelopmentSettings>,
) => {
  const budgetDevelopment = ref<BudgetDevelopment>();
  const isLoading = ref(false);

  const fetch = async () => {
    if (!userId.value || isLoading.value) return;
    isLoading.value = true;

    const queryParams: Record<string, unknown> = {};
    if (settings.value.includePast != null)
      queryParams.includePast = settings.value.includePast;
    if (settings.value.checkLength != null)
      queryParams.checkLength = settings.value.checkLength;

    try {
      budgetDevelopment.value = await client.send(
        `api/collections/users/records/${userId.value}/budget-development`,
        { params: queryParams },
      );
    } finally {
      isLoading.value = false;
    }
  };

  watch([userId, settings], fetch, { immediate: true });

  return { budgetDevelopment, fetch, isLoading };
};
