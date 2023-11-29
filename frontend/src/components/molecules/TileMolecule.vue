<script lang="ts" setup>
import type { Icon } from "@/types";
import { ElIcon, ElProgress } from "element-plus";
import SkeletonAtom from "../atoms/SkeletonAtom.vue";

defineProps<{
  title: string;
  subtitle?: string;
  icon?: Icon;
  color?: "success" | "danger";
  loading?: boolean;
  percentage?: number;
}>();

const percentageColors = [
  { color: "var(--el-color-danger)", percentage: 25 },
  { color: "var(--el-color-warning)", percentage: 60 },
  { color: "var(--el-color-success)", percentage: 60 },
];
</script>

<template>
  <div class="tile">
    <ElProgress
      v-if="percentage != null"
      type="dashboard"
      :percentage="Math.round(percentage)"
      :color="percentageColors"
      :width="32"
      :stroke-width="4"
    />

    <el-icon
      v-else-if="icon"
      :size="32"
      :class="{
        'tile__icon--success': color === 'success',
        'tile__icon--danger': color === 'danger',
      }"
    >
      <component :is="icon" />
    </el-icon>

    <SkeletonAtom :loaded="!loading" :width="96" class="tile__title">
      <p class="tile__title font--truncated">{{ title }}</p>
    </SkeletonAtom>

    <p class="tile__subtitle font--truncated">{{ subtitle }}</p>
  </div>
</template>

<style lang="scss" scoped>
.tile {
  display: grid;
  overflow: hidden;
  gap: 4px;
  padding: var(--app-space-2);
  width: 128px;
  border-radius: 10px var(--el-border-radius-round);
  box-shadow: var(--el-box-shadow-lighter);
  background-color: var(--el-bg-color-overlay);

  &__title {
    font-weight: 600;
    margin: 0;
    margin-top: 4px;
  }

  &__subtitle {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    margin: 0;
  }

  &__icon {
    &--success {
      color: var(--el-color-success);
    }

    &--danger {
      color: var(--el-color-danger);
    }
  }

  .el-progress {
    width: fit-content;

    :deep(.el-progress__text) {
      left: -8px;
      font-size: 8px !important;
    }
  }
}
</style>
