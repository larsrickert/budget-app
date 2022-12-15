<script lang="ts" setup>
import logoSrc from "@/assets/logo.svg";
import { HomeFilled, UserFilled } from "@element-plus/icons-vue";
import { computed, provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterView, useRouter } from "vue-router";
import SideMenuTemplate from "./components/templates/SideMenuTemplate.vue";
import { useFile } from "./composables/use-file";
import { useAuthStore } from "./stores/auth";
import { provideIsDrawerOpenSymbol } from "./types";
import type { VueProps } from "./types/vue";

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const isDrawerOpen = ref(false);
provide(provideIsDrawerOpenSymbol, isDrawerOpen);

const navItems = computed<VueProps<typeof SideMenuTemplate>["navItems"]>(() => {
  if (!authStore.isAuthenticated) return [];

  return [
    {
      label: t("home.pageName"),
      icon: HomeFilled,
      href: "/",
    },
  ];
});

const { file: avatarUrl } = useFile({
  collection: "users",
  record: computed(() => authStore.user?.id),
  filename: computed(() => authStore.user?.avatar),
  format: { width: 24, height: 24, type: "fit" },
});

const subItems = computed<VueProps<typeof SideMenuTemplate>["subItems"]>(() => {
  if (authStore.isAuthenticated) {
    return [
      {
        label: t("profile.myProfilePageName"),
        img: avatarUrl.value,
        icon: UserFilled,
        href: "/profile",
      },
    ];
  }

  return [
    {
      label: t("login.pageName"),
      icon: UserFilled,
      href: "/login",
    },
  ];
});
</script>

<template>
  <div>
    <SideMenuTemplate
      :title="t('app.title')"
      :subtitle="t('app.subtitle')"
      :logo-src="logoSrc"
      :nav-items="navItems"
      :sub-items="subItems"
      :active-href="router.currentRoute.value.path"
      v-model:is-drawer-open="isDrawerOpen"
      @item-click="router.push($event)"
    >
      <router-view />
    </SideMenuTemplate>
  </div>
</template>

<style lang="scss"></style>
