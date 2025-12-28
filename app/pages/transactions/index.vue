<script lang="ts" setup>
import { iconCash, iconCreditCard, iconPlus } from "@sit-onyx/icons";
import { useToast } from "sit-onyx";

definePageMeta({ layout: false, middleware: ["authenticated"] });

const { t } = useI18n();
useHead({ title: computed(() => t("transactions.transaction", 2)) });
const localePath = useLocalePath();
const toast = useToast();

const type = useQueryParam({
  name: "type",
  defaultValue: "outcome",
  whitelist: ["income", "outcome"],
});

const pageQuery = useQueryParam<string>({
  name: "page",
  defaultValue: "1",
});

const page = computed({
  get: () => +pageQuery.value || 1,
  set: (newPage) => (pageQuery.value = newPage.toString()),
});

// reset page when type changes
watch(type, () => (page.value = 1));

const {
  data: transactions,
  status,
  refresh,
} = await useFetch("/api/transactions", {
  query: { type, page },
  key: "transactions",
});

const tabs = useTemplateRef<{ $el: HTMLElement }>("tabsRef");
const teleportTarget = computed(() => tabs.value?.$el.querySelector(".onyx-tabs__tablist"));

const { data: overdueTransactions, refresh: refreshOverdueTransactions } = await useFetch(
  "/api/transactions/overdue",
);

const {
  executeImmediate: handleUpdateOverdueTransactions,
  isLoading: isUpdateOverdueTransactionsLoading,
} = useAsyncState(
  async (ids: Transaction["id"][]) => {
    const response = await $fetch("/api/transactions/overdue", {
      method: "POST",
      body: { ids },
    });
    return response;
  },
  undefined,
  {
    immediate: false,
    onSuccess: async () => {
      toast.show({
        headline: t("transactions.toasts.updateOverdue.success"),
        color: "success",
      });
      await Promise.all([refresh(), refreshOverdueTransactions()]);
    },
    onError: (e) => {
      toast.show({
        headline: t("transactions.toasts.updateOverdue.error"),
        description: getApiErrorMessage(e),
        color: "danger",
      });
    },
  },
);
</script>

<template>
  <NuxtLayout name="default" :headline="t('transactions.transaction', 2)">
    <div class="page">
      <OverdueTransactionsCard
        v-if="overdueTransactions?.length"
        :transactions="overdueTransactions"
        :loading="isUpdateOverdueTransactionsLoading"
        @adjust="handleUpdateOverdueTransactions"
      />

      <OnyxTabs ref="tabsRef" v-model="type" :label="$t('transactions.types')">
        <OnyxTab value="outcome">
          <template #tab>{{ $t("transactions.outcome", 2) }}</template>

          <PaginatedTransactionList
            v-model:page="page"
            :list="transactions"
            :skeleton="status === 'pending'"
            :icon="iconCreditCard"
          />
        </OnyxTab>

        <OnyxTab value="income">
          <template #tab> {{ $t("transactions.income", 2) }} </template>

          <PaginatedTransactionList
            v-model:page="page"
            :list="transactions"
            :skeleton="status === 'pending'"
            :icon="iconCash"
          />
        </OnyxTab>
      </OnyxTabs>

      <Teleport v-if="teleportTarget" :to="teleportTarget" defer>
        <OnyxIconButton
          class="create-button"
          :label="$t('transactions.createNew')"
          color="neutral"
          :icon="iconPlus"
          density="compact"
          :link="localePath(`/transactions/new?type=${type}`)"
        />
      </Teleport>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-lg);
}

.create-button {
  margin-left: auto;
}
</style>
