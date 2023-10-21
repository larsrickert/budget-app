import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./HelpAtom.vue";

const meta = {
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    content: "This is a help text.",
  },
} satisfies Story;

export const WithSize = {
  args: {
    ...Primary.args,
    size: 64,
  },
} satisfies Story;
