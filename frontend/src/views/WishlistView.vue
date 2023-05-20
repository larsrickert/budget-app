<script lang="ts" setup>
import WishlistsTemplate from "@/components/templates/WishlistsTemplate.vue";
import { usePagination } from "@/composables/use-pagination";
import { useWishlists, type WishlistDto } from "@/composables/use-wishlist";
import { watch } from "vue";

const { items, isLoading } = usePagination<WishlistDto>("wishlists", {
  query: { sort: "created" },
});

const { record, isFetching, fetch } = useWishlists();

watch(
  items,
  async (newItems) => {
    if (!newItems.length || record.value || isFetching.value) return;
    await fetch(newItems[0].id);
  },
  { immediate: true }
);
</script>

<template>
  <WishlistsTemplate
    :selected-wishlist="record"
    :wishlists="items"
    :list-loading="isLoading"
    :record-loading="isFetching"
    @fetch-wishlist="fetch"
  />
</template>
