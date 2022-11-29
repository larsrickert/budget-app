<script lang="ts" setup>
import { provideIsDrawerOpenSymbol } from "@/types";
import { ElButton } from "element-plus";
import { inject } from "vue";

const isDrawerOpen = inject(provideIsDrawerOpenSymbol);
</script>

<template>
  <div>
    <el-button
      v-if="isDrawerOpen != null"
      @click="isDrawerOpen != null ? (isDrawerOpen = true) : undefined"
      >Open drawer</el-button
    >
  </div>
</template>

<style lang="scss" scoped></style>
