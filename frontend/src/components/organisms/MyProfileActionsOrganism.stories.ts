import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./MyProfileActionsOrganism.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    createdDate: new Date().toISOString(),
    avatar: "https://picsum.photos/100",
  },
};

export const Verified: StoryObj<Args> = {
  args: {
    ...Primary.args,
    isVerified: true,
  },
};
