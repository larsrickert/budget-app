<script lang="ts" setup>
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import { computed } from "vue";

const props = defineProps<{
  loaded?: boolean;
  throttle?: number;
  width?: number;
  height?: number;
}>();

const _width = computed(() => props.width && `${props.width}px`);
const _height = computed(() => props.height && `${props.height}px`);
</script>

<template>
  <el-skeleton
    animated
    :throttle="throttle"
    :loading="!loaded"
    :style="{ height: _height, width: _width }"
  >
    <slot></slot>

    <template #template>
      <el-skeleton-item :style="{ height: _height, width: _width }" />
    </template>
  </el-skeleton>
</template>

<style lang="scss" scoped></style>
