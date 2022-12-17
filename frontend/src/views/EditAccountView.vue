<script lang="ts" setup>
import EditAccountTemplate from "@/components/templates/EditAccountTemplate.vue";
import { useAccount, type CreateAccountDto } from "@/composables/use-account";
import { showToast } from "@/utils/io";
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();

const accountId = computed(() => {
  const id = route.params.id ?? "";
  return typeof id === "string" ? id : id.at(0);
});

const { record, update, isFetching, fetch } = useAccount();
const isLoading = ref(false);

watchEffect(async () => {
  if (!accountId.value) return;
  await fetch(accountId.value);
});

const handleSubmit = async (dto: CreateAccountDto) => {
  isLoading.value = true;

  try {
    await update(dto);
    showToast({
      message: t("account.toasts.updated"),
      duration: 3000,
      type: "success",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <EditAccountTemplate
    :headline="t('account.editPageName')"
    :submit-label="t('global.update')"
    :disabled="isFetching"
    :not-found="!isFetching && !record"
    :loading="isFetching"
    :initial-value="record"
    @submit="handleSubmit"
  />
</template>
