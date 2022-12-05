<script lang="ts" setup>
defineProps<{
  headline: string;
}>();
</script>

<template>
  <div class="app-headline">
    <h2>{{ headline }}</h2>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.app-headline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-2);

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    padding-bottom: var(--app-space-1);
  }
}
</style>
