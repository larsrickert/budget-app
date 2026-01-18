<script lang="ts" setup>
import { repository } from "~~/package.json";

const localePath = useLocalePath();
const { loggedIn } = useUserSession();
</script>

<template>
  <OnyxNavBar
    logo-url="/favicon.svg"
    :app-name="$t('app.name')"
    :app-area="{ link: localePath(loggedIn ? '/dashboard' : '/') }"
    with-back-button
    @navigate-back="$router.back"
  >
    <OnyxNavItem :label="$t('dashboard')" :link="localePath('/dashboard')" />
    <OnyxNavItem :label="$t('transactions.transaction', 2)" :link="localePath('/transactions')" />

    <OnyxNavItem :label="$t('contact')" :link="{ href: repository.url, target: '_blank' }" />

    <template #contextArea>
      <UserMenu />
    </template>
  </OnyxNavBar>
</template>
