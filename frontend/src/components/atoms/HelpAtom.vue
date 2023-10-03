<script lang="ts" setup>
import { QuestionFilled } from "@element-plus/icons-vue";
import { ElIcon, ElTooltip } from "element-plus";

withDefaults(
  defineProps<{
    content: string;
    /** @default 18 */
    size?: number;
  }>(),
  {
    size: 18,
  },
);
</script>

<template>
  <div class="help" :style="{ height: `${size}px`, width: `${size}px` }">
    <el-tooltip :content="content">
      <el-icon :size="size">
        <QuestionFilled />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.help {
  cursor: help;
  display: inherit;
}
</style>
