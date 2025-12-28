<script lang="ts" setup>
import { useToast } from "sit-onyx";

definePageMeta({ layout: false, middleware: ["authenticated"] });

const { t } = useI18n();
const toast = useToast();
const localePath = useLocalePath();

useHead({
  title: computed(() => t("accounts.createNew")),
});

const { executeImmediate: handleSubmit, isLoading } = useAsyncState(
  async (body: NewAccount) => {
    const response = await $fetch("/api/accounts", {
      method: "POST",
      body,
    });
    return response;
  },
  undefined,
  {
    immediate: false,
    onSuccess: async () => {
      toast.show({
        headline: t("accounts.toasts.create.success"),
        color: "success",
      });
      await navigateTo({ path: localePath("/dashboard") });
    },
    onError: (e) => {
      toast.show({
        headline: t("accounts.toasts.create.error"),
        description: getApiErrorMessage(e),
        color: "danger",
      });
    },
  },
);
</script>

<template>
  <NuxtLayout name="default" :headline="t('accounts.createNew')">
    <EditAccountForm :loading="isLoading" @submit="handleSubmit" />
  </NuxtLayout>
</template>
