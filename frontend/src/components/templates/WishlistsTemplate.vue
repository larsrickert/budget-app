<script lang="ts" setup>
import type { WishlistDto } from "@/composables/use-wishlist";
import { ElEmpty, ElTabPane, ElTabs } from "element-plus";
import { useI18n } from "vue-i18n";
import HeadlineAtom from "../atoms/HeadlineAtom.vue";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

const props = defineProps<{
  wishlists: WishlistDto[];
  listLoading?: boolean;
  recordLoading?: boolean;
  selectedWishlist?: WishlistDto;
}>();

const emit = defineEmits<{
  (event: "fetchWishlist", id: string): void;
}>();

const { t } = useI18n();
</script>

<template>
  <div>
    <HeaderOrganism :headline="t('wishlists.pageName')" />

    <div class="page__content">
      <el-tabs
        :model-value="props.selectedWishlist?.id"
        v-loading="props.listLoading"
        @update:model-value="emit('fetchWishlist', $event as string)"
      >
        <el-tab-pane
          v-for="wishlist of props.wishlists"
          :key="wishlist.id"
          :name="wishlist.id"
          :label="wishlist.name"
        />
      </el-tabs>

      <el-empty
        v-if="!props.wishlists.length"
        :description="t('wishlists.empty')"
      />

      <div v-else-if="props.selectedWishlist" class="wishlist">
        <HeadlineAtom :headline="props.selectedWishlist.name" />
      </div>

      <div v-else v-loading="props.recordLoading"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wishlist {
  margin-top: 32px;
}
</style>
