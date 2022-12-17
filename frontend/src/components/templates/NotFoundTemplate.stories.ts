import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./NotFoundTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    path: "/does-not-exist",
    actionLabel: "Back to home page",
  },
};
