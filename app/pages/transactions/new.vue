<script lang="ts" setup>
import { useToast } from "sit-onyx";

definePageMeta({ layout: false, middleware: ["authenticated"] });

const { t } = useI18n();
const toast = useToast();
const localePath = useLocalePath();
const formId = useId();

const type = useQueryParam({
  name: "type",
  defaultValue: "outcome",
  whitelist: ["outcome", "income"],
});

useHead({
  title: computed(() => t("transactions.createNew")),
});

const { executeImmediate: handleSubmit, isLoading } = useAsyncState(
  async (body: NewTransaction) => {
    const response = await $fetch("/api/transactions", {
      method: "POST",
      body,
    });
    return response;
  },
  undefined,
  {
    immediate: false,
    onSuccess: async (transaction) => {
      toast.show({
        headline: t("transactions.toasts.create.success"),
        color: "success",
      });

      await navigateTo({
        path: localePath("/transactions"),
        query: { type: transaction?.type },
      });
    },
    onError: (e) => {
      toast.show({
        headline: t("transactions.toasts.create.error"),
        description: getApiErrorMessage(e),
        color: "danger",
      });
    },
  },
);
</script>

<template>
  <NuxtLayout name="default" :headline="t('transactions.createNew')">
    <EditTransactionForm :id="formId" :disabled="isLoading" :type @submit="handleSubmit" />

    <template #footer>
      <OnyxBottomBar>
        <OnyxButton :label="$t('create')" type="submit" :loading="isLoading" :form="formId" />
      </OnyxBottomBar>
    </template>
  </NuxtLayout>
</template>
