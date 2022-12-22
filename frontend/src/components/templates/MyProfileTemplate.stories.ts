import type { User } from "@/stores/auth";
import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./MyProfileTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

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

export const Primary: StoryObj<Args> = {
  args: {
    user,
  },
};

export const WithoutAvatar: StoryObj<Args> = {
  args: {
    user: {
      ...user,
      avatar: "",
    },
  },
};

export const NotVerified: StoryObj<Args> = {
  args: {
    user: {
      ...user,
      verified: false,
    },
  },
};

export const Loading: StoryObj<Args> = {
  args: {
    ...Primary.args,
    isSubmitLoading: true,
    isDeleteLoading: true,
  },
};

export const WithoutUser: StoryObj<Args> = {
  args: {},
};
