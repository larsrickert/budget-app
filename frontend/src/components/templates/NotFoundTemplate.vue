<script lang="ts" setup>
import { Back } from "@element-plus/icons-vue";
import { ElButton, ElLink } from "element-plus";
import { useI18n } from "vue-i18n";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

defineProps<{
  path: string;
  actionLabel: string;
}>();

const emit = defineEmits<{
  (event: "actionClick"): void;
}>();

const { t } = useI18n();
</script>

<template>
  <div>
    <HeaderOrganism :headline="t('notFound.pageName')" />

    <div class="page__content">
      <i18n-t keypath="notFound.description" tag="div">
        <template #path>
          <el-link :underline="false" disabled>{{ path }}</el-link>
        </template>
      </i18n-t>

      <el-button class="action" :icon="Back" @click="emit('actionClick')">
        {{ actionLabel }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action {
  margin-top: var(--app-space-3);
}
</style>
