<script lang="ts" setup>
import logoSrc from "@/assets/logo.svg";
import { HomeFilled } from "@element-plus/icons-vue";
import { computed, provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterView, useRouter } from "vue-router";
import SideMenuTemplate from "./components/templates/SideMenuTemplate.vue";
import { provideIsDrawerOpenSymbol } from "./types";
import type { VueProps } from "./types/vue";

const { t } = useI18n();
const router = useRouter();

const navItems = computed<VueProps<typeof SideMenuTemplate>["navItems"]>(() => {
  return [
    {
      label: t("home.pageName"),
      icon: HomeFilled,
      href: "/",
    },
    {
      label: "Nav Item 2",
      icon: HomeFilled,
      href: "/test",
    },
  ];
});

const isDrawerOpen = ref(false);
provide(provideIsDrawerOpenSymbol, isDrawerOpen);
</script>

<template>
  <div>
    <SideMenuTemplate
      :title="t('app.title')"
      :subtitle="t('app.subtitle')"
      :logo-src="logoSrc"
      :nav-items="navItems"
      :active-href="router.currentRoute.value.path"
      v-model:is-drawer-open="isDrawerOpen"
      @item-click="router.push($event)"
    >
      <router-view />
    </SideMenuTemplate>
  </div>
</template>

<style lang="scss"></style>
