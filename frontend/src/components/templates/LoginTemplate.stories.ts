import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./LoginTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {},
};

export const Disabled: StoryObj<Args> = {
  args: {
    disabled: true,
  },
};

export const Loading: StoryObj<Args> = {
  args: {
    loading: true,
  },
};
