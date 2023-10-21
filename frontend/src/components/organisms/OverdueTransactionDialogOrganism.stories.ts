import { TransactionFrequency } from "@/composables/use-transaction";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./OverdueTransactionDialogOrganism.vue";

const meta = {
  component: Component,
  argTypes: {
    "onUpdate:visible": { action: "update:visible" },
    onSelect: { action: "select" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    visible: true,
    transactions: Array.from({ length: 5 }, (_, index) => ({
      id: (index + 1).toString(),
      name: `Transaction ${index + 1}`,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      bookingDate: new Date().toISOString(),
      value: Math.round(Math.random() * 100),
      frequency: TransactionFrequency.MONTHLY,
      notes: "",
      type: "income",
      userId: "1",
    })),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Primary.args,
    loading: true,
  },
} satisfies Story;
