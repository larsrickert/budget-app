<script lang="ts" setup>
import type { VueProps } from "@/types/vue";
import SideMenuItemAtom from "../atoms/SideMenuItemAtom.vue";

type Item = Omit<VueProps<typeof SideMenuItemAtom>, "active"> & {
  href: string;
};

defineProps<{
  items: Item[];
  activeHref: string;
}>();

const emit = defineEmits<{
  itemClick: [href: string];
}>();
</script>

<template>
  <div class="items">
    <SideMenuItemAtom
      v-for="item in items"
      :key="item.label"
      v-bind="item"
      :active="item.href === activeHref"
      @click="item.href !== activeHref && emit('itemClick', item.href)"
    />
  </div>
</template>

<style lang="scss" scoped>
.items {
  display: grid;
  gap: var(--app-space-1);
}
</style>
