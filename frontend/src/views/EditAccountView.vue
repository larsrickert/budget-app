<script lang="ts" setup>
import EditAccountTemplate from "@/components/templates/EditAccountTemplate.vue";
import { useAccount, type CreateAccountDto } from "@/composables/use-account";
import { showToast } from "@/utils/io";
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const accountId = computed(() => {
  const id = router.currentRoute.value.params.id ?? "";
  return typeof id === "string" ? id : id.at(0);
});

const { record, update, isFetching, fetch, remove } = useAccount();
const isUpdateLoading = ref(false);
const isDeleteLoading = ref(false);

watchEffect(async () => {
  if (!accountId.value) return;
  await fetch(accountId.value);
});

const handleSubmit = async (dto: CreateAccountDto) => {
  isUpdateLoading.value = true;

  try {
    await update(dto);
    showToast({
      message: t("account.toasts.updated"),
      duration: 3000,
      type: "success",
    });
    await router.replace("/");
  } finally {
    isUpdateLoading.value = false;
  }
};

const handleDelete = async () => {
  isDeleteLoading.value = true;

  try {
    await remove();
    showToast({
      message: t("account.toasts.deleted"),
      duration: 3000,
      type: "success",
    });
    await router.replace("/");
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<template>
  <EditAccountTemplate
    :headline="t('account.editPageName')"
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
