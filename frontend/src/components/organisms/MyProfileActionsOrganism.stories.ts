import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./MyProfileActionsOrganism.vue";

const meta = {
  component: Component,
  argTypes: {
    onAvatarSelect: { action: "avatarSelect" },
    onDeleteUser: { action: "deleteUser" },
    onRequestEmailVerification: { action: "requestEmailVerification" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    createdDate: new Date().toISOString(),
    avatar: "https://picsum.photos/100",
  },
} satisfies Story;

export const Verified = {
  args: {
    ...Primary.args,
    isVerified: true,
  },
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
