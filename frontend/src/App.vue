<script lang="ts" setup>
import logoSrc from "@/assets/logo.svg";
import {
  CreditCard,
  HomeFilled,
  Setting,
  UserFilled,
} from "@element-plus/icons-vue";
import { useDark } from "@vueuse/core";
import { ElConfigProvider } from "element-plus";
import de from "element-plus/dist/locale/de";
import { computed, provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterView, useRouter } from "vue-router";
import SideMenuTemplate from "./components/templates/SideMenuTemplate.vue";
import { useFile } from "./composables/use-file";
import { getUserPreferredLocale } from "./i18n";
import { useAuthStore } from "./stores/auth";
import { provideIsDrawerOpenSymbol } from "./types";
import type { VueProps } from "./types/vue";

const { t, locale } = useI18n();
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
    {
      label: t("transactions.pageName"),
      icon: CreditCard,
      href: "/transactions",
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
  const items: VueProps<typeof SideMenuTemplate>["subItems"] = [
    {
      label: t("settings.pageName"),
      icon: Setting,
      href: "/settings",
    },
  ];

  if (authStore.isAuthenticated) {
    items.unshift({
      label: t("profile.myProfilePageName"),
      img: avatarUrl.value,
      icon: UserFilled,
      href: "/profile",
    });
  } else {
    items.unshift({
      label: t("login.pageName"),
      icon: UserFilled,
      href: "/login",
    });
  }

  return items;
});

// enable auto dark/light mode
useDark();

// detect user locale
const userPreferredLocale = getUserPreferredLocale();
if (userPreferredLocale) locale.value = userPreferredLocale;
</script>

<template>
  <div>
    <el-config-provider :locale="locale === 'de' ? de : undefined">
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
    </el-config-provider>
  </div>
</template>

<style lang="scss"></style>
