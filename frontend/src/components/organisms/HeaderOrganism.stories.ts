import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./HeaderOrganism.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    headline: "Headline",
  },
};

export const LongText: StoryObj<Args> = {
  args: {
    ...Primary.args,
    headline: "Test ".repeat(100),
  },
};

export const WithBack: StoryObj<Args> = {
  args: {
    ...Primary.args,
    showBack: true,
  },
};
