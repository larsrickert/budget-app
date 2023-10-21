import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./SettingsTemplate.vue";

const meta = {
  component: Component,
  argTypes: {
    "onUpdate:isDark": { action: "update:isDark" },
    "onUpdate:locale": { action: "update:locale" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    isDark: true,
    locale: "en",
    availableLocales: ["en", "de"],
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Primary.args,
    disabled: true,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Primary.args,
    isLocaleLoading: true,
    isDarkLoading: true,
  },
} satisfies Story;

export const DisallowLocaleChange = {
  args: {
    ...Primary.args,
    disallowLocaleChange: true,
  },
} satisfies Story;
