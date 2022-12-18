import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./SettingsTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    isDark: true,
    locale: "en",
    availableLocales: ["en", "de"],
  },
};

export const Disabled: StoryObj<Args> = {
  args: {
    disabled: true,
  },
};
