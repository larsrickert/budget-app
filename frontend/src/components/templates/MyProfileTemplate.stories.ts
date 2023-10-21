import type { User } from "@/stores/auth";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./MyProfileTemplate.vue";

const meta = {
  component: Component,
  argTypes: {
    onDeleteUser: { action: "deleteUser" },
    onLogout: { action: "logout" },
    onRequestEmailVerification: { action: "requestEmailVerification" },
    onSubmit: { action: "submit" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const user: User = {
  id: "1",
  verified: true,
  username: "johndoe",
  email: "john.doe@example.de",
  avatar: "https://picsum.photos/100",
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  locale: "en",
  theme: "light",
};

export const Primary = {
  args: {
    user,
  },
} satisfies Story;

export const WithoutAvatar = {
  args: {
    user: {
      ...user,
      avatar: "",
    },
  },
} satisfies Story;

export const NotVerified = {
  args: {
    user: {
      ...user,
      verified: false,
    },
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Primary.args,
    isSubmitLoading: true,
    isDeleteLoading: true,
  },
} satisfies Story;

export const WithoutUser = { args: {} } satisfies Story;

export const EmailChangeDisabled = {
  args: {
    ...Primary.args,
    allowEmailChange: false,
  },
} satisfies Story;
