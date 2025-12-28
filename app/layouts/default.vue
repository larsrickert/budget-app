<script lang="ts" setup>
const props = defineProps<{
  headline?: string;
}>();

defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
  /**
   * Optional header content
   */
  header?(): unknown;
}>();
</script>

<template>
  <OnyxPageLayout :no-padding="!!props.headline">
    <template v-if="props.headline">
      <PageHeader :headline="props.headline">
        <slot name="header"></slot>
      </PageHeader>

      <div class="onyx-grid-layout">
        <slot></slot>
      </div>
    </template>

    <slot v-else></slot>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.hero {
  background-color: var(--onyx-color-base-primary-200);

  &__content {
    padding-block: var(--onyx-density-2xl);
  }
}
</style>
