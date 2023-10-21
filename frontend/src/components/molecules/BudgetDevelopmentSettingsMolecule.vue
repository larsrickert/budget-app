<script lang="ts" setup>
import type { BudgetDevelopmentSettings } from "@/composables/use-budget-development";
import { Setting } from "@element-plus/icons-vue";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElPopover,
  ElSlider,
  ElSwitch,
} from "element-plus";
import equal from "fast-deep-equal/es6";
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import HelpAtom from "../atoms/HelpAtom.vue";

const props = defineProps<{
  modelValue?: BudgetDevelopmentSettings;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: BudgetDevelopmentSettings];
}>();

const { t } = useI18n();

const state = ref<BudgetDevelopmentSettings>({});

watchEffect(() => {
  if (!props.modelValue) return;
  state.value = { ...props.modelValue };
});

const handleHide = () => {
  if (equal(state.value, props.modelValue)) return;
  emit("update:modelValue", { ...state.value });
};
</script>

<template>
  <div>
    <el-popover
      :title="t('settings.pageName')"
      trigger="click"
      :width="325"
      @hide="handleHide"
    >
      <template #reference>
        <el-button :icon="Setting" circle />
      </template>

      <el-form :model="state" label-position="top">
        <el-form-item :label="t('home.chart.settings.checkLength.label')">
          <div class="input">
            <el-slider v-model="state.checkLength" :min="1" :max="24" />
            <HelpAtom :content="t('home.chart.settings.checkLength.help')" />
          </div>
        </el-form-item>

        <el-form-item :label="t('home.chart.settings.includePast.label')">
          <div class="input">
            <el-switch v-model="state.includePast" />
            <HelpAtom :content="t('home.chart.settings.includePast.help')" />
          </div>
        </el-form-item>
      </el-form>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.el-form {
  margin-bottom: -16px;
}
</style>
