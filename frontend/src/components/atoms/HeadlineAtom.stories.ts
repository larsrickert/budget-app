import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./HeadlineAtom.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
  render: (args) => ({
    components: { Component },
    setup: () => ({ args }),
    template: `<Component v-bind="args">Slot content</Component>`,
  }),
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    headline: "My headline",
  },
};

export const LongText: StoryObj<Args> = {
  args: {
    headline: "Test ".repeat(100),
  },
};
