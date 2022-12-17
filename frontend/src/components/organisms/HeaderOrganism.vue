<script lang="ts" setup>
import { provideIsDrawerOpenSymbol } from "@/types";
import { Back, Menu } from "@element-plus/icons-vue";
import { ElButton, ElTooltip } from "element-plus";
import { inject, type DefineComponent } from "vue";

defineProps<{
  headline: string;
  showBack?: boolean;
  rightIcon?: DefineComponent;
  rightIconText?: string;
}>();

const emit = defineEmits<{
  (event: "back"): void;
  (event: "rightIconClick"): void;
}>();

const isDrawerOpen = inject(provideIsDrawerOpenSymbol);

const toggleDrawer = () => {
  if (!isDrawerOpen) return;
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>

<template>
  <header class="header">
    <div class="header__content">
      <el-button
        v-if="showBack"
        :icon="Back"
        circle
        color="transparent"
        class="btn--icon btn--no-gap"
        @click="emit('back')"
      />
      <el-button
        v-else
        :icon="Menu"
        circle
        color="transparent"
        class="header__menu btn--icon"
        @click="toggleDrawer"
      />
      <h1 class="header__headline font--truncated">{{ headline }}</h1>
    </div>

    <el-tooltip :content="rightIconText">
      <el-button
        v-if="rightIcon"
        :icon="rightIcon"
        circle
        color="transparent"
        class="btn--icon btn--no-gap"
        @click="emit('rightIconClick')"
      />
    </el-tooltip>
  </header>
</template>

<style lang="scss" scoped>
@use "@/styles/mixins.scss" as *;

.header {
  position: relative;
  background: var(--el-color-primary);
  background: linear-gradient(
    90deg,
    var(--el-color-primary) 0%,
    var(--app-color-secondary) 100%
  );
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-2);

  padding: var(--app-space-3);

  // app-space-3 + height of ::after element
  padding-top: calc(var(--app-space-2) + var(--app-space-3));

  @include breakpoint(l) {
    padding: var(--app-space-2);
    padding-bottom: var(--app-space-3);
    font-size: 20px;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: var(--app-space-2);
    max-width: 100%;
    // 32px button width - header gap size
    width: calc(100% - 32px - var(--app-space-2));
  }

  &__headline {
    font-size: inherit;
    font-weight: 500;
    color: currentColor;
    margin: 0;
    text-shadow: var(--el-box-shadow-lighter);
  }

  .btn {
    &--icon {
      font-size: inherit;
      height: 32px;
      width: 32px;
    }

    &--no-gap {
      @include breakpoint(l, min) {
        margin-left: calc(-1 * var(--app-space-2));
      }
    }
  }

  &__menu {
    @include breakpoint(l, min) {
      display: none;
    }
  }

  &::after {
    width: 100%;
    height: var(--app-space-2);
    background: var(--el-bg-color);
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: var(--el-border-radius-round) var(--el-border-radius-round) 0
      0;
    box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.1);
  }
}
</style>
