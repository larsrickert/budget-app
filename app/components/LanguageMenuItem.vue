<script lang="ts" setup>
import { flagDE, flagUS } from "@sit-onyx/flags";
import type { SelectDialogOption } from "sit-onyx";

const { locale, setLocale, locales } = useI18n();

const flagMap: Record<typeof locale.value, string> = {
  "en-US": flagUS,
  "de-DE": flagDE,
};

const options = computed(() => {
  return locales.value.map((locale) => {
    return {
      label: locale.name ?? locale.code,
      value: locale.code,
      icon: flagMap[locale.code],
    } satisfies SelectDialogOption;
  });
});
</script>

<template>
  <OnyxLanguageMenuItem :options :model-value="locale" @update:model-value="setLocale" />
</template>
