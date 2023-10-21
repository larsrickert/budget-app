import { CreditCard } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./TileMolecule.vue";

const meta = {
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    title: "Title",
    subtitle: "Subtitle",
    icon: CreditCard,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Primary.args,
    loading: true,
  },
} satisfies Story;

export const LongText = {
  args: {
    ...Primary.args,
    title: "Title ".repeat(10),
    subtitle: "Subtitle ".repeat(10),
  },
} satisfies Story;

export const Success = {
  args: {
    ...Primary.args,
    color: "success",
  },
} satisfies Story;

export const Danger = {
  args: {
    ...Primary.args,
    color: "danger",
  },
} satisfies Story;

export const WithPercentage = {
  args: {
    ...Primary.args,
    percentage: 75,
  },
} satisfies Story;
