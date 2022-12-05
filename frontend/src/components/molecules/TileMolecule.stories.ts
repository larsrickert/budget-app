import type { VueProps } from "@/types/vue";
import { CreditCard } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./TileMolecule.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    title: "Title",
    subtitle: "Subtitle",
    icon: CreditCard,
  },
};

export const Loading: StoryObj<Args> = {
  args: {
    ...Primary.args,
    loading: true,
  },
};

export const LongText: StoryObj<Args> = {
  args: {
    ...Primary.args,
    title: "Title ".repeat(10),
    subtitle: "Subtitle ".repeat(10),
  },
};

export const Success: StoryObj<Args> = {
  args: {
    ...Primary.args,
    color: "success",
  },
};

export const Danger: StoryObj<Args> = {
  args: {
    ...Primary.args,
    color: "danger",
  },
};
