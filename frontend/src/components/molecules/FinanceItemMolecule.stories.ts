import { WalletFilled } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./FinanceItemMolecule.vue";

const meta = {
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    title: "Finance Item",
    subtitle: "Subtitle",
    value: "3.99 €",
    icon: WalletFilled,
  },
} satisfies Story;

export const LongText = {
  args: {
    ...Primary.args,
    title: "Title ".repeat(100),
    subtitle: "Subtitle ".repeat(100),
  },
} satisfies Story;

export const Minimal = {
  args: {
    title: "Finance Item",
    value: "3.99 €",
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Primary.args,
    skeleton: true,
  },
} satisfies Story;
