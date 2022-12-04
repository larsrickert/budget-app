<script lang="ts" setup>
import HeaderOrganism from "@/components/organisms/HeaderOrganism.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div>
    <HeaderOrganism :headline="t('home.pageName')" />

    <div class="page__content">WIP</div>
  </div>
</template>

<style lang="scss" scoped></style>
