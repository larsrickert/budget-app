<script lang="ts" setup>
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useVModel } from "@vueuse/core";
import {
  ElForm,
  ElFormItem,
  ElOption,
  ElSelect,
  ElSwitch,
  ElTooltip,
} from "element-plus";
import { useI18n } from "vue-i18n";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

const props = defineProps<{
  disabled?: boolean;
  isDark?: boolean;
  locale: string;
  availableLocales: string[];
}>();

const emit = defineEmits<{
  (event: "update:isDark", value: boolean): void;
  (event: "update:locale", value: string): void;
}>();

const { t } = useI18n();

const isDarkModel = useVModel(props, "isDark", emit);
const localeModel = useVModel(props, "locale", emit);

const getFlagSrc = (locale: string) => {
  const localeName = locale === "en" ? "us" : locale;
  return new URL(
    `../../../node_modules/svg-country-flags/png100px/${localeName}.png`,
    import.meta.url
  ).href;
};
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
        <el-form-item :label="t('settings.language')">
          <el-select v-model="localeModel" name="language">
            <el-option
              v-for="locale in availableLocales"
              :key="locale"
              :value="locale"
              :label="t(`global.locales.${locale}`)"
            >
              <div class="locale">
                <img
                  class="locale__flag"
                  :src="getFlagSrc(locale)"
                  :alt="locale"
                />
                <span>{{ t(`global.locales.${locale}`) }}</span>
              </div>
            </el-option>

            <template #prefix>
              <img
                class="locale__flag"
                :src="getFlagSrc(locale)"
                :alt="locale"
              />
            </template>
          </el-select>
        </el-form-item>

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

<style lang="scss" scoped>
.locale {
  display: flex;
  align-items: center;
  gap: var(--app-space-1);

  &__flag {
    height: 16px;
    width: 16px;
    border-radius: 50%;
  }
}
</style>
