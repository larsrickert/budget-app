import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./HeadlineAtom.vue";

const meta = {
  component: Component,
  render: (args) => ({
    components: { Component },
    setup: () => ({ args }),
    template: `<Component v-bind="args">Slot content</Component>`,
  }),
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    headline: "My headline",
  },
} satisfies Story;

export const LongText = {
  args: {
    headline: "Test ".repeat(100),
  },
} satisfies Story;
