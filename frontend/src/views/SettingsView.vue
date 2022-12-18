<script lang="ts" setup>
import SettingsTemplate from "@/components/templates/SettingsTemplate.vue";
import { getUserPreferredLocale } from "@/i18n";
import { useAuthStore } from "@/stores/auth";
import { useColorMode, useDark } from "@vueuse/core";
import { computed, nextTick, ref } from "vue";
import { useI18n } from "vue-i18n";

const authStore = useAuthStore();
const { locale, availableLocales } = useI18n();

const isDark = useDark();
const userPreferredLocale = getUserPreferredLocale();

const isLocaleLoading = ref(false);
const localeModel = computed({
  get: () => locale.value,
  set: async (value) => {
    if (!authStore.isAuthenticated) {
      locale.value = value;
      return;
    }

    if (isLocaleLoading.value) return;
    isLocaleLoading.value = true;

    try {
      authStore.updateSettings({
        locale: value === userPreferredLocale ? "" : value,
      });
    } finally {
      isLocaleLoading.value = false;
    }
  },
});

const isDarkLoading = ref(false);
const isDarkModel = computed({
  get: () => isDark.value,
  set: async (value) => {
    isDark.value = value;
    if (!authStore.isAuthenticated) return;

    if (isDarkLoading.value) return;
    isDarkLoading.value = true;

    await nextTick();
    const theme = useColorMode({ emitAuto: true }).value;

    try {
      authStore.updateSettings({ theme: theme === "auto" ? "" : theme });
    } finally {
      isDarkLoading.value = false;
    }
  },
});
</script>

<template>
  <SettingsTemplate
    v-model:is-dark="isDarkModel"
    v-model:locale="localeModel"
    :available-locales="availableLocales"
    :is-locale-loading="isLocaleLoading"
    :is-dark-loading="isDarkLoading"
    :disallow-locale-change="!authStore.isAuthenticated"
  />
</template>
