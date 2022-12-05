<script lang="ts" setup>
import { ElIcon } from "element-plus";
import type { DefineComponent } from "vue";
import SkeletonAtom from "../atoms/SkeletonAtom.vue";

defineProps<{
  title: string;
  subtitle?: string;
  icon?: DefineComponent;
  color?: "success" | "danger";
  loading?: boolean;
}>();
</script>

<template>
  <div class="tile">
    <slot>
      <el-icon
        v-if="icon"
        :size="32"
        :class="{
          'tile__icon--success': color === 'success',
          'tile__icon--danger': color === 'danger',
        }"
      >
        <component :is="icon" />
      </el-icon>
    </slot>

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
}
</style>
