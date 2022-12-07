import type { VueProps } from "@/types/vue";
import { WalletFilled } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./FinanceItemMolecule.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    title: "Finance Item",
    subtitle: "Subtitle",
    value: "3.99 €",
    icon: WalletFilled,
  },
};

export const LongText: StoryObj<Args> = {
  args: {
    ...Primary.args,
    title: "Title ".repeat(100),
    subtitle: "Subtitle ".repeat(100),
  },
};

export const Minimal: StoryObj<Args> = {
  args: {
    title: "Finance Item",
    value: "3.99 €",
  },
};

export const Skeleton: StoryObj<Args> = {
  args: {
    ...Primary.args,
    skeleton: true,
  },
};
