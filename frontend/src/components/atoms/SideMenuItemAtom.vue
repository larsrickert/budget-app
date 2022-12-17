<script lang="ts" setup>
import { ElIcon } from "element-plus";
import type { DefineComponent } from "vue";

defineProps<{
  label: string;
  active?: boolean;
  icon?: DefineComponent;
  /** If img and icon are defined, img will be used. */
  img?: string;
}>();
</script>

<template>
  <div class="nav-item" :class="{ 'nav-item--active': active }">
    <img v-if="img" :src="img" :alt="label" />
    <el-icon v-else :size="24">
      <component :is="icon" />
    </el-icon>
    <span>{{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.nav-item {
  border-radius: var(--el-border-radius-base);
  padding: var(--app-space-1) var(--app-space-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--app-space-3);

  span {
    color: var(--el-text-color-primary);
    font-weight: 500;
  }

  img {
    height: 24px;
    width: 24px;
    object-fit: cover;
    border-radius: 50%;
  }

  &:hover {
    background-color: var(--el-fill-color-light);
  }

  &:active {
    background-color: var(--el-fill-color);
  }

  &--active {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);

    span {
      color: var(--el-color-primary);
    }

    &:hover {
      background-color: var(--el-color-primary-light-8);
    }

    &:active {
      background-color: var(--el-color-primary-light-7);
    }
  }
}
</style>
