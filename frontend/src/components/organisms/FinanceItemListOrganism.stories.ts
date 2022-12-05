import type { VueProps } from "@/types/vue";
import { WalletFilled } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./FinanceItemListOrganism.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    items: [
      {
        id: "1",
        title: "Finance Item 1",
        subtitle: "Subtitle",
        icon: WalletFilled,
        value: "3.99",
      },
      {
        id: "2",
        title: "Finance Item 2",
        subtitle: "Subtitle",
        icon: WalletFilled,
        value: "29.99",
      },
    ],
  },
};

export const WithTotal: StoryObj<Args> = {
  args: {
    ...Primary.args,
    total: "123.99 €",
    totalLabel: "Total",
  },
};

export const Skeleton: StoryObj<Args> = {
  args: {
    ...Primary.args,
    skeletonCount: 3,
  },
};
