<script lang="ts" setup>
import { iconLogin, iconLogout } from "@sit-onyx/icons";
import { version } from "~~/package.json";

const { user, clear, ready } = useUserSession();
const localePath = useLocalePath();

const handleLogin = () => navigateTo("/login", { external: true });

const handleLogout = async () => {
  await clear();
  await navigateTo(localePath("/"));
};
</script>

<template>
  <OnyxUserMenu v-if="user" :full-name="user.name" :description="user.email" :avatar="user.picture">
    <ColorSchemeMenuItem />
    <LanguageMenuItem />

    <OnyxMenuItem color="danger" @click="handleLogout">
      <OnyxIcon :icon="iconLogout" />
      {{ $t("auth.logout") }}
    </OnyxMenuItem>

    <template #footer>
      {{ $t("app.version") }}
      <span class="onyx-text--monospace">{{ version }}</span>
    </template>
  </OnyxUserMenu>

  <OnyxButton
    v-else
    :label="$t('auth.login')"
    mode="outline"
    :icon="iconLogin"
    :skeleton="!ready"
    @click="handleLogin"
  />
</template>
