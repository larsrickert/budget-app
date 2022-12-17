<script lang="ts" setup>
import EditTransactionTemplate from "@/components/templates/EditTransactionTemplate.vue";
import {
  useTransaction,
  type CreateTransactionDto,
} from "@/composables/use-transaction";
import { showToast } from "@/utils/io";
import { ref } from "vue";
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
</script>

<template>
  <EditTransactionTemplate
    :headline="t('transaction.addPageName')"
    :submit-label="t('global.add')"
    :disabled="isLoading"
    :submit-loading="isLoading"
    @submit="handleSubmit"
  />
</template>
