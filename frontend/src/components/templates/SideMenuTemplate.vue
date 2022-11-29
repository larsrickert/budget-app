<script lang="ts" setup>
import type { VueProps } from "@/types/vue";
import { useVModel } from "@vueuse/core";
import {
  ElAside,
  ElContainer,
  ElDivider,
  ElDrawer,
  ElMain,
} from "element-plus";
import { ref } from "vue";
import SideMenuItemGroupOrganism from "../organisms/SideMenuItemGroupOrganism.vue";

const props = defineProps<{
  title: string;
  subtitle: string;
  logoSrc: string;
  navItems: VueProps<typeof SideMenuItemGroupOrganism>["items"];
  subItems?: VueProps<typeof SideMenuItemGroupOrganism>["items"];
  activeHref: string;
  isDrawerOpen?: boolean;
}>();

const emit = defineEmits<{
  (event: "itemClick", href: string): void;
  (event: "update:isDrawerOpen", value: boolean): void;
}>();

const isDrawerOpenModel = useVModel(props, "isDrawerOpen", emit);
const drawerRef = ref(null);

const handleItemClick = (href: string) => {
  emit("itemClick", href);
  isDrawerOpenModel.value = false;
};
</script>

<template>
  <div>
    <el-container class="side-menu">
      <Teleport :to="drawerRef || 'body'" :disabled="!isDrawerOpenModel">
        <component :is="isDrawerOpenModel ? 'div' : ElAside">
          <img class="side-menu__logo" :src="logoSrc" :alt="title" />
          <h2 class="side-menu__title">{{ title }}</h2>
          <p class="side-menu__subtitle">{{ subtitle }}</p>

          <SideMenuItemGroupOrganism
            :items="navItems"
            :active-href="activeHref"
            class="side-menu__items"
            @item-click="handleItemClick"
          />

          <template v-if="subItems?.length">
            <el-divider />

            <SideMenuItemGroupOrganism
              :items="subItems"
              :active-href="activeHref"
              class="side-menu__items"
              @item-click="handleItemClick"
            />
          </template>
        </component>
      </Teleport>

      <el-main>
        <slot></slot>
      </el-main>
    </el-container>

    <el-drawer
      v-model="isDrawerOpenModel"
      direction="ltr"
      :close-on-press-escape="false"
      :with-header="false"
      class="drawer"
      @close="isDrawerOpenModel = false"
    >
      <div ref="drawerRef"></div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/mixins.scss" as *;

:global(.el-drawer__body) {
  --el-drawer-padding-primary: var(--app-space-3);
}

:global(.el-drawer) {
  width: 25% !important;

  @include breakpoint(l) {
    width: 300px !important;
  }
}

.side-menu {
  height: 100vh;

  .el-aside {
    width: 25%;

    padding: var(--app-space-3);
    background-color: var(--el-bg-color-overlay);
    border-right: 1px solid var(--el-border-color);
    box-shadow: var(--el-box-shadow-lighter);

    @include breakpoint(l) {
      display: none;
    }
  }

  .el-main {
    --el-main-padding: 0;
  }

  &__logo {
    display: block;
    width: 100px;
    max-width: 100%;
    margin-bottom: var(--app-space-2);
  }

  &__title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }

  &__subtitle {
    margin: 0;
    color: var(--el-text-color-secondary);
  }

  &__items {
    margin-top: var(--app-space-3);
    margin-left: calc(-1 * var(--app-space-2));
  }
}
</style>
