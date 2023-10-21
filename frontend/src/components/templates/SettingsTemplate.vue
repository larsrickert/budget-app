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
import HelpAtom from "../atoms/HelpAtom.vue";
import HeaderOrganism from "../organisms/HeaderOrganism.vue";

const props = defineProps<{
  disabled?: boolean;
  isDark?: boolean;
  locale: string;
  availableLocales: string[];
  isLocaleLoading?: boolean;
  isDarkLoading?: boolean;
  disallowLocaleChange?: boolean;
}>();

const emit = defineEmits<{
  "update:isDark": [value: boolean];
  "update:locale": [value: string];
}>();

const { t } = useI18n();

const isDarkModel = useVModel(props, "isDark", emit);
const localeModel = useVModel(props, "locale", emit);

const getFlagSrc = (locale: string) => {
  const localeName = locale === "en" ? "us" : locale;
  return new URL(
    `../../../node_modules/svg-country-flags/png100px/${localeName}.png`,
    import.meta.url,
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
          <el-select
            v-model="localeModel"
            v-loading="isLocaleLoading"
            name="language"
            :disabled="isLocaleLoading || disallowLocaleChange"
          >
            <el-option
              v-for="_locale in availableLocales"
              :key="_locale"
              :value="_locale"
              :label="t(`global.locales.${_locale}`)"
            >
              <div class="locale">
                <img
                  class="locale__flag"
                  :src="getFlagSrc(_locale)"
                  :alt="_locale"
                />
                <span>{{ t(`global.locales.${_locale}`) }}</span>
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

          <HelpAtom
            v-if="disallowLocaleChange"
            :content="t('settings.localeChangeNotAllowed')"
            class="locale__help"
          />
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
              :loading="isDarkLoading"
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

  &__help {
    margin-left: var(--app-space-2);
  }
}
</style>
