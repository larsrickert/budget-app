<script setup lang="ts">
import type { NuxtError } from "#app";
import App from "./app.vue";

const props = defineProps<{
  error: NuxtError;
}>();

const localePath = useLocalePath();

const _clearError = () => clearError({ redirect: localePath("/") });
</script>

<template>
  <App>
    <div class="error">
      <OnyxErrorSVG class="error__image" />

      <div class="error__headline">
        <OnyxHeadline is="h1">{{ props.error.message }}</OnyxHeadline>
        <OnyxButton :label="$t('error.backToHome')" @click="_clearError" />
      </div>

      <OnyxAccordion>
        <OnyxAccordionItem value="details">
          <template #header>{{ $t("error.technicalDetails") }}</template>
          <pre class="error__details">{{ JSON.stringify(props.error, null, 2) }}</pre>
        </OnyxAccordionItem>
      </OnyxAccordion>
    </div>
  </App>
</template>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--onyx-density-3xl);

  &__image {
    width: 32rem;
    display: block;
  }

  &__headline {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--onyx-density-md);
  }

  &__details {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-family: var(--onyx-font-family-mono);
  }
}
</style>
