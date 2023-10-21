import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./NotFoundTemplate.vue";

const meta = {
  component: Component,
  argTypes: {
    onActionClick: { action: "actionClick" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    path: "/does-not-exist",
    actionLabel: "Back to home page",
  },
} satisfies Story;
