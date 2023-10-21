import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./ConfirmDialogMolecule.vue";

const meta = {
  component: Component,
  argTypes: {
    onConfirm: { action: "confirm" },
    "onUpdate:modelValue": { action: "update:modelValue" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    modelValue: true,
    title: "This is the title",
    cancelText: "Cancel",
    confirmText: "Confirm",
    description: "Are you sure you want to do action XYZ?",
  },
} satisfies Story;

export const WithCustomSlot = {
  args: {
    ...Primary.args,
  },
  render: (args) => ({
    components: { Component },
    setup: () => ({ args }),
    template: `<Component v-bind="args">Custom slot content.</Component>`,
  }),
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
    loading: true,
  },
} satisfies Story;

export const WithoutActions = {
  args: {
    ...Primary.args,
    showActions: false,
  },
} satisfies Story;
