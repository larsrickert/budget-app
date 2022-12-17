<script lang="ts" setup>
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useVModel } from "@vueuse/core";
import { ElForm, ElFormItem, ElSwitch, ElTooltip } from "element-plus";
import { useI18n } from "vue-i18n";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

const props = defineProps<{
  disabled?: boolean;
  isDark?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:isDark", value: boolean): void;
}>();

const { t } = useI18n();

const isDarkModel = useVModel(props, "isDark", emit);
</script>

<template>
  <div>
    <HeaderOrganism :headline="t('settings.pageName')" />

    <div class="page__content">
      <el-form
        :disabled="disabled"
        require-asterisk-position="right"
        status-icon
        scroll-to-error
        :validate-on-rule-change="false"
      >
        <el-form-item :label="t('settings.theme')">
          <el-tooltip
            :content="t(`settings.themes.${isDarkModel ? 'dark' : 'light'}`)"
          >
            <el-switch
              v-model="isDarkModel"
              inline-prompt
              :active-icon="Moon"
              :inactive-icon="Sunny"
            />
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
