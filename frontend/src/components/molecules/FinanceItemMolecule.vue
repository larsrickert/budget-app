<script lang="ts" setup>
import type { Icon } from "@/types";
import { ArrowRight } from "@element-plus/icons-vue";
import { ElIcon } from "element-plus";
import SkeletonAtom from "../atoms/SkeletonAtom.vue";

defineProps<{
  title: string;
  subtitle?: string;
  icon?: Icon;
  value: string;
  skeleton?: boolean;
  hideArrow?: boolean;
}>();
</script>

<template>
  <div class="item">
    <div class="item__group overflow--hidden">
      <SkeletonAtom v-if="icon" :loaded="!skeleton" :width="36" :height="36">
        <el-icon class="item__icon" :size="24">
          <component :is="icon" />
        </el-icon>
      </SkeletonAtom>

      <div class="overflow--hidden">
        <SkeletonAtom :loaded="!skeleton" :width="128">
          <p class="item__title font--truncated">{{ title }}</p>
        </SkeletonAtom>
        <SkeletonAtom :loaded="!skeleton" :width="64">
          <p class="item__subtitle font--truncated">{{ subtitle }}</p>
        </SkeletonAtom>
      </div>
    </div>

    <div class="item__value">
      <SkeletonAtom :loaded="!skeleton" :width="48">
        {{ value }}
        <el-icon v-if="!hideArrow" :size="18">
          <ArrowRight />
        </el-icon>
      </SkeletonAtom>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-3);
  font-weight: 500;
  cursor: pointer;
  height: 48px;

  &__group {
    display: flex;
    align-items: center;
    gap: var(--app-space-3);
    width: 100%;
  }

  &__icon {
    background-color: var(--el-fill-color);
    border-radius: var(--el-border-radius-base);
    padding: 6px;
    margin-top: 6px;
    margin-bottom: 6px;
  }

  &__title {
    margin: 0;
  }

  &__subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--el-text-color-secondary);
    font-weight: 400;
  }

  &__value {
    min-width: fit-content;
    display: flex;
    align-items: center;
    gap: var(--app-space-1);
  }
}

.overflow {
  &--hidden {
    overflow: hidden;
  }
}
</style>
