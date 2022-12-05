import type { VueProps } from "@/types";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./HeadlineAtom.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    headline: "My headline",
  },
};
