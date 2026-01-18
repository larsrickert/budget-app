<script lang="ts" setup>
import { iconLogin } from "@sit-onyx/icons";

definePageMeta({ layout: false });

const { t } = useI18n();
useHead({ titleTemplate: "%s", title: computed(() => t("app.name")) });

const handleLogin = () => navigateTo("/login", { external: true });
</script>

<template>
  <NuxtLayout name="default" :headline="$t('app.name')">
    <template #header>
      <p>{{ $t("app.description") }}</p>
    </template>

    <div class="page">
      <div class="section">
        <OnyxHeadline is="h2">{{ $t("intro.gettingStarted.headline") }}</OnyxHeadline>
        <p>{{ $t("intro.gettingStarted.description") }}</p>
        <OnyxButton :label="$t('auth.login')" :icon="iconLogin" @click="handleLogin" />
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xl);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-sm);
}
</style>
