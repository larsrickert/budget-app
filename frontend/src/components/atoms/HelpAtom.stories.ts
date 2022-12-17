import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./HelpAtom.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    content: "This is a help text.",
  },
};

export const WithSize: StoryObj<Args> = {
  args: {
    ...Primary.args,
    size: 64,
  },
};
