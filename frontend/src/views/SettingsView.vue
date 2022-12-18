<script lang="ts" setup>
import SettingsTemplate from "@/components/templates/SettingsTemplate.vue";
import { useDark } from "@vueuse/core";
import { useI18n } from "vue-i18n";

const { locale, availableLocales } = useI18n();

const isDark = useDark();
</script>

<template>
  <SettingsTemplate
    v-model:is-dark="isDark"
    v-model:locale="locale"
    :available-locales="availableLocales"
  />
</template>
