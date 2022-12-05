<script lang="ts" setup>
import type { VueProps } from "@/types/vue";
import { ElEmpty } from "element-plus";
import { useI18n } from "vue-i18n";
import HeadlineAtom from "../atoms/HeadlineAtom.vue";
import FinanceItemListOrganism from "../organisms/FinanceItemListOrganism.vue";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

defineProps<{
  modelValue?: unknown;
  accounts: VueProps<typeof FinanceItemListOrganism>["items"];
  isAccountsLoading?: boolean;
}>();

const emit = defineEmits<{
  (event: "itemClick", id: string): void;
}>();

const { t } = useI18n();
</script>

<template>
  <div>
    <HeaderOrganism :headline="t('home.pageName')" />

    <div class="page__content">
      <section>
        <HeadlineAtom :headline="t('global.accounts', 2)" />

        <FinanceItemListOrganism
          v-if="accounts.length || isAccountsLoading"
          :items="accounts"
          :skeleton-count="isAccountsLoading ? 3 : 0"
          @item-click="emit('itemClick', $event.id)"
        />

        <el-empty v-else :description="t('home.noAccounts')" class="empty" />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  --el-empty-padding: 0 0 var(--app-space-3) 0;
}
</style>
