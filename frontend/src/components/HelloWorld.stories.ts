import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./HelloWorld.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    msg: "Hello World!",
  },
};
