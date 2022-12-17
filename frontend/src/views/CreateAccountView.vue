<script lang="ts" setup>
import EditAccountTemplate from "@/components/templates/EditAccountTemplate.vue";
import { useAccount, type CreateAccountDto } from "@/composables/use-account";
import { showToast } from "@/utils/io";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const { create } = useAccount();
const isLoading = ref(false);

const handleSubmit = async (dto: CreateAccountDto) => {
  isLoading.value = true;

  try {
    await create(dto);
    showToast({
      message: t("account.toasts.created"),
      duration: 3000,
      type: "success",
    });
    await router.push("/");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <EditAccountTemplate
    :headline="t('account.addPageName')"
    :submit-label="t('global.add')"
    :disabled="isLoading"
    :submit-loading="isLoading"
    @submit="handleSubmit"
  />
</template>
