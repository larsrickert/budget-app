<script lang="ts" setup>
import EditTransactionTemplate from "@/components/templates/EditTransactionTemplate.vue";
import {
  useTransaction,
  type CreateTransactionDto,
} from "@/composables/use-transaction";
import { showToast } from "@/utils/io";
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const transactionId = computed(() => {
  const id = router.currentRoute.value.params.id ?? "";
  return typeof id === "string" ? id : id.at(0);
});

const { record, update, isFetching, fetch, remove } = useTransaction();
const isUpdateLoading = ref(false);
const isDeleteLoading = ref(false);

watchEffect(async () => {
  if (!transactionId.value) return;
  await fetch(transactionId.value);
});

const handleSubmit = async (dto: CreateTransactionDto) => {
  isUpdateLoading.value = true;

  try {
    await update(dto);
    showToast({
      message: t("transaction.toasts.updated"),
      duration: 3000,
      type: "success",
    });
    await router.replace("/transactions");
  } finally {
    isUpdateLoading.value = false;
  }
};

const handleDelete = async () => {
  isDeleteLoading.value = true;

  try {
    await remove();
    showToast({
      message: t("transaction.toasts.deleted"),
      duration: 3000,
      type: "success",
    });
    await router.replace("/transactions");
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<template>
  <EditTransactionTemplate
    :headline="t('transaction.editPageName')"
    :submit-label="t('global.update')"
    :disabled="isFetching || isUpdateLoading || isDeleteLoading"
    :not-found="!isFetching && !record"
    :loading="isFetching || isDeleteLoading"
    :submit-loading="isUpdateLoading"
    :initial-value="record"
    @submit="handleSubmit"
    @delete="handleDelete"
  />
</template>
