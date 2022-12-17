<script lang="ts" setup>
import SettingsTemplate from "@/components/templates/SettingsTemplate.vue";
import { useDark } from "@vueuse/core";

const isDark = useDark();
</script>

<template>
  <SettingsTemplate v-model:is-dark="isDark" />
</template>
