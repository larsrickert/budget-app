<script lang="ts" setup>
import { iconTrash } from "@sit-onyx/icons";
import { useToast } from "sit-onyx";

definePageMeta({ layout: false, middleware: ["authenticated"] });

const { t } = useI18n();
const toast = useToast();
const localePath = useLocalePath();
const formId = useId();

const id = useRouteParam("id");
const { data, status } = await useFetch(() => `/api/transactions/${id.value as ":id"}`);

useHead({
  title: computed(() => data.value?.name),
});

const { executeImmediate: handleSubmit, isLoading: isSubmitLoading } = useAsyncState(
  async (body: NewAccount) => {
    const response = await $fetch(`/api/transactions/${id.value as ":id"}`, {
      method: "PATCH",
      body,
    });
    return response;
  },
  undefined,
  {
    immediate: false,
    onSuccess: async () => {
      toast.show({
        headline: t("transactions.toasts.update.success"),
        color: "success",
      });
      await navigateTo({
        path: localePath("/transactions"),
        query: { type: data.value?.type },
      });
    },
    onError: (e) => {
      toast.show({
        headline: t("transactions.toasts.update.error"),
        description: getApiErrorMessage(e),
        color: "danger",
      });
    },
  },
);

const { executeImmediate: handleDelete, isLoading: isDeleteLoading } = useAsyncState(
  async () => {
    const response = await $fetch(`/api/transactions/${id.value as ":id"}`, { method: "DELETE" });
    return response;
  },
  undefined,
  {
    immediate: false,
    onSuccess: async () => {
      toast.show({
        headline: t("transactions.toasts.delete.success"),
        color: "success",
      });
      await navigateTo({
        path: localePath("/transactions"),
        query: { type: data.value?.type },
        replace: true,
      });
    },
    onError: (e) => {
      toast.show({
        headline: t("transactions.toasts.delete.error"),
        description: getApiErrorMessage(e),
        color: "danger",
      });
    },
  },
);
</script>

<template>
  <NuxtLayout name="default" :headline="data?.name">
    <OnyxEmpty v-if="!data && status !== 'pending'">
      {{ $t("accounts.notFound") }}
    </OnyxEmpty>

    <EditTransactionForm
      v-else
      :id="formId"
      :transaction="data"
      :type="data?.type ?? 'outcome'"
      :skeleton="status === 'pending'"
      :disabled="isSubmitLoading || isDeleteLoading"
      @submit="handleSubmit"
    />

    <template #footer>
      <OnyxBottomBar>
        <ConfirmDeleteModal @confirm="handleDelete">
          <template #default="{ trigger }">
            <OnyxButton
              v-bind="trigger"
              :label="$t('delete')"
              color="danger"
              mode="plain"
              :icon="iconTrash"
              :loading="isDeleteLoading"
            />
          </template>
        </ConfirmDeleteModal>

        <OnyxButton :label="$t('save')" type="submit" :loading="isSubmitLoading" :form="formId" />
      </OnyxBottomBar>
    </template>
  </NuxtLayout>
</template>
