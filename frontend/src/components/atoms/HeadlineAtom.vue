<script lang="ts" setup>
defineProps<{
  headline: string;
}>();
</script>

<template>
  <div class="app-headline">
    <h2 class="font--truncated">{{ headline }}</h2>
    <div class="app-headline__slot">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-headline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-2);
  padding-bottom: var(--app-space-1);

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  &__slot {
    min-width: fit-content;
  }
}
</style>
