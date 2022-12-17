import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./ConfirmDialogMolecule.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    modelValue: true,
    title: "This is the title",
    cancelText: "Cancel",
    confirmText: "Confirm",
    description: "Are you sure you want to do action XYZ?",
  },
};

export const WithCustomSlot: StoryObj<Args> = {
  args: {
    ...Primary.args,
  },
  render: (args) => ({
    components: { Component },
    setup: () => ({ args }),
    template: `<Component v-bind="args">Custom slot content.</Component>`,
  }),
};

export const Disabled: StoryObj<Args> = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const Loading: StoryObj<Args> = {
  args: {
    ...Primary.args,
    loading: true,
  },
};

export const WithoutActions: StoryObj<Args> = {
  args: {
    ...Primary.args,
    showActions: false,
  },
};
