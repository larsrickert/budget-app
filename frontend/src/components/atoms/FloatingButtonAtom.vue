<script lang="ts" setup>
import type { VueProps } from "@/types/vue";
import { Plus } from "@element-plus/icons-vue";
import { ElButton, ElIcon, ElTooltip } from "element-plus";
import type { DefineComponent } from "vue";

withDefaults(
  defineProps<{
    /** @default Plus */
    icon?: DefineComponent;
    /** @default primary */
    type?: VueProps<typeof ElButton>["type"];
    disabled?: boolean;
    tooltipText?: string;
  }>(),
  {
    icon: Plus,
    type: "primary",
  },
);
</script>

<template>
  <div class="fab">
    <el-tooltip :content="tooltipText" :disabled="!tooltipText">
      <el-button :type="type" circle size="large" :disabled="disabled">
        <el-icon :size="20">
          <component :is="icon" />
        </el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/mixins.scss" as *;

.fab {
  position: fixed;
  bottom: var(--app-space-3);
  right: var(--app-space-3);
  z-index: 100;

  @include breakpoint(s) {
    bottom: var(--app-space-2);
    right: var(--app-space-2);
  }

  .el-button {
    box-shadow: var(--el-box-shadow);
  }
}
</style>
