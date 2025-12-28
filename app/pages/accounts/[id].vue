<script lang="ts" setup>
import { iconTrash } from "@sit-onyx/icons";
import { useToast } from "sit-onyx";

definePageMeta({ layout: false, middleware: ["authenticated"] });

const { t } = useI18n();
const toast = useToast();
const localePath = useLocalePath();

const id = useRouteParam("id");
const { data, status } = await useFetch(() => `/api/accounts/${id.value}`);

useHead({
  title: computed(() => data.value?.name),
});

const { executeImmediate: handleSubmit, isLoading: isSubmitLoading } = useAsyncState(
  async (body: NewAccount) => {
    const response = await $fetch(`/api/accounts/${id.value}`, {
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
        headline: t("accounts.toasts.update.success"),
        color: "success",
      });
      await navigateTo({ path: localePath("/dashboard") });
    },
    onError: (e) => {
      toast.show({
        headline: t("accounts.toasts.update.error"),
        description: getApiErrorMessage(e),
        color: "danger",
      });
    },
  },
);

const { executeImmediate: handleDelete, isLoading: isDeleteLoading } = useAsyncState(
  async () => {
    const response = await $fetch(`/api/accounts/${id.value}`, { method: "DELETE" });
    return response;
  },
  undefined,
  {
    immediate: false,
    onSuccess: async () => {
      toast.show({
        headline: t("accounts.toasts.delete.success"),
        color: "success",
      });
      await navigateTo({ path: localePath("/dashboard"), replace: true });
    },
    onError: (e) => {
      toast.show({
        headline: t("accounts.toasts.delete.error"),
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

    <EditAccountForm
      v-else
      :account="data"
      :skeleton="status === 'pending'"
      :loading="isSubmitLoading"
      :disabled="isDeleteLoading"
      @submit="handleSubmit"
    >
      <template #actions>
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
      </template>
    </EditAccountForm>
  </NuxtLayout>
</template>
