import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./CreateProfileTemplate.vue";

const meta = {
  component: Component,
  argTypes: {
    onLogin: { action: "login" },
    onSubmit: { action: "submit" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = { args: {} } satisfies Story;

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
