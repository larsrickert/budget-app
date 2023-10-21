import { WalletFilled } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./FinanceItemListOrganism.vue";

const meta = {
  component: Component,
  argTypes: {
    onItemClick: { action: "itemClick" },
    "onUpdate:currentPage": { action: "update:currentPage" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    items: new Array(15).fill("").map((_, index) => ({
      id: index.toString(),
      title: `Finance Item ${index + 1}`,
      subtitle: "Subtitle",
      icon: WalletFilled,
      value: "3.99",
    })),
    pageCount: 10,
    currentPage: 3,
  },
} satisfies Story;

export const WithTotal = {
  args: {
    ...Primary.args,
    total: "123.99 €",
    totalLabel: "Total",
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Primary.args,
    skeletonCount: 3,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Primary.args,
    disabled: true,
  },
} satisfies Story;
