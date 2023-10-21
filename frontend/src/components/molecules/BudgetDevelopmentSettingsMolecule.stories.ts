import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./BudgetDevelopmentSettingsMolecule.vue";

const meta = {
  component: Component,
  argTypes: {
    "onUpdate:modelValue": { action: "update:modelValue" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    modelValue: {
      checkLength: 6,
    },
  },
} satisfies Story;
