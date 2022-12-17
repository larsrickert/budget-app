<script lang="ts" setup>
import FloatingButtonAtom from "@/components/atoms/FloatingButtonAtom.vue";
import HomePageTemplate from "@/components/templates/HomePageTemplate.vue";
import type { AccountDto } from "@/composables/use-account";
import { usePagination } from "@/composables/use-pagination";
import { useTransactionSummary } from "@/composables/use-transaction-summary";
import { useAuthStore } from "@/stores/auth";
import type { VueProps } from "@/types/vue";
import { WalletFilled } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useBudgetDevelopment } from "../composables/use-budget-development";

const authStore = useAuthStore();
const { t, n } = useI18n();
const router = useRouter();

const { items, currentPage, pageCount, isLoading } = usePagination<AccountDto>(
  "accounts",
  {
    query: { sort: "created" },
  }
);

const accounts = computed<VueProps<typeof HomePageTemplate>["accounts"]>(() => {
  return items.value.map((i) => ({
    id: i.id,
    title: i.name,
    value: n(i.value, "currency"),
    subtitle: i.notes,
    icon: WalletFilled,
  }));
});

const { summary, isLoading: isSummaryLoading } = useTransactionSummary(
  computed(() => authStore.user?.id),
  { initialFetch: true }
);

const { budgetDevelopment, isLoading: isBudgetDevelopmentLoading } =
  useBudgetDevelopment(
    computed(() => authStore.user?.id),
    { initialFetch: true }
  );
</script>

<template>
  <div>
    <HomePageTemplate
      :accounts="accounts"
      :account-page-count="pageCount"
      :is-accounts-loading="isLoading"
      v-model:current-account-page="currentPage"
      :transaction-summary="summary"
      :is-transaction-summary-loading="isSummaryLoading"
      :budget-development="budgetDevelopment"
      :is-budget-development-loading="isBudgetDevelopmentLoading"
    />

    <FloatingButtonAtom
      :tooltip-text="t('home.fabTooltip')"
      @click="router.push('/accounts/new')"
    />
  </div>
</template>

<style lang="scss" scoped></style>
