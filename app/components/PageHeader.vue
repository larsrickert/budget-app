<script lang="ts" setup>
const props = defineProps<{
  /**
   * Page headline.
   */
  headline: string;
}>();

const slots = defineSlots<{
  default?(): unknown;
}>();
</script>

<template>
  <section class="header">
    <div class="onyx-grid-layout header__content">
      <OnyxHeadline is="h1" class="header__headline">
        {{ props.headline }}
      </OnyxHeadline>

      <div v-if="slots.default" class="header__custom-content">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";
$after-height: var(--onyx-density-md);

.header {
  position: relative;
  background: var(--onyx-color-base-primary-500);
  background: linear-gradient(
    90deg,
    var(--onyx-color-base-primary-500) 0%,
    var(--onyx-color-base-info-500) 100%
  );
  padding-top: $after-height;
  margin-bottom: calc(-1 * $after-height);
  color: #fff;

  &__content {
    padding-block: var(--onyx-density-2xl);
  }

  // use smaller spacings on mobile to not waste vertical space
  @include breakpoints.screen(max, sm) {
    margin-bottom: calc(-1 * $after-height - var(--onyx-density-xl));
    padding-top: 0;

    &__content {
      padding-block: var(--onyx-density-xl);
    }
  }

  &__headline {
    color: inherit;
  }

  &__custom-content {
    margin-top: var(--onyx-density-sm);
  }

  &::after {
    width: 100%;
    height: $after-height;
    background: var(--onyx-color-base-background-tinted);
    content: "";
    position: relative;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: var(--onyx-radius-full) var(--onyx-radius-full) 0 0;
  }
}
</style>
