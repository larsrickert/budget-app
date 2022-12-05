<script lang="ts" setup>
import HomePageTemplate from "@/components/templates/HomePageTemplate.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <HomePageTemplate :accounts="[]" />
</template>

<style lang="scss" scoped></style>
