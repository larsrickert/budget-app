import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./BudgetDevelopmentSettingsMolecule.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
  argTypes: {
    "onUpdate:modelValue": { action: "update:modelValue" },
  },
} as Meta<Args>;

export const Primary = {
  args: {
    modelValue: {
      checkLength: 6,
    },
  },
} satisfies StoryObj<Args>;
