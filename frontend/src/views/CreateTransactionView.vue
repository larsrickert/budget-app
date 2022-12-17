<script lang="ts" setup>
import EditTransactionTemplate from "@/components/templates/EditTransactionTemplate.vue";
import {
  TRANSACTION_TYPES,
  useTransaction,
  type CreateTransactionDto,
  type TransactionType,
} from "@/composables/use-transaction";
import { showToast } from "@/utils/io";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const { create } = useTransaction();
const isLoading = ref(false);

const handleSubmit = async (dto: CreateTransactionDto) => {
  isLoading.value = true;

  try {
    await create(dto);
    showToast({
      message: t("transaction.toasts.created"),
      duration: 3000,
      type: "success",
    });
    await router.push("/transactions");
  } finally {
    isLoading.value = false;
  }
};

const initialTypeQuery = computed<TransactionType | undefined>(() => {
  const { type } = router.currentRoute.value.query;
  if (!type) return;

  const typeValue = typeof type === "string" ? type : type[0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!TRANSACTION_TYPES.includes(typeValue as any)) return;
  return typeValue as TransactionType;
});
</script>

<template>
  <EditTransactionTemplate
    :headline="t('transaction.addPageName')"
    :submit-label="t('global.add')"
    :disabled="isLoading"
    :submit-loading="isLoading"
    :initial-type="initialTypeQuery"
    @submit="handleSubmit"
  />
</template>
