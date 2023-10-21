import { Search } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./HeaderOrganism.vue";

const meta = {
  component: Component,
  argTypes: {
    onBack: { action: "back" },
    onRightIconClick: { action: "rightIconClick" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    headline: "Headline",
    rightIcon: Search,
    rightIconText: "Custom text",
  },
} satisfies Story;

export const LongText = {
  args: {
    ...Primary.args,
    headline: "Test ".repeat(100),
  },
} satisfies Story;

export const WithBack = {
  args: {
    ...Primary.args,
    showBack: true,
  },
} satisfies Story;
