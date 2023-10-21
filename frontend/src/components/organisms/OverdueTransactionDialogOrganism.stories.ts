import { TransactionFrequency } from "@/composables/use-transaction";
import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./OverdueTransactionDialogOrganism.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
  argTypes: {
    "onUpdate:visible": { action: "update:visible" },
    onSelect: { action: "select" },
  },
} as Meta<Args>;

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
} satisfies StoryObj<Args>;

export const Loading = {
  args: {
    ...Primary.args,
    loading: true,
  },
} satisfies StoryObj<Args>;
