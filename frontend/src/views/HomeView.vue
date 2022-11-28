<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div>
    <HelloWorld :msg="t('message')" />
  </div>
</template>

<style lang="scss" scoped></style>
