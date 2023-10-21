import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./LoginTemplate.vue";

const meta = {
  component: Component,
  argTypes: {
    onRegister: { action: "register" },
    onSubmit: { action: "submit" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = { args: {} } satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const Loading = {
  args: {
    loading: true,
  },
} satisfies Story;

export const WithTestUser = {
  args: {
    ...Primary.args,
    testUser: {
      usernameOrEmail: "testuser",
      password: "123456789",
    },
  },
} satisfies Story;
