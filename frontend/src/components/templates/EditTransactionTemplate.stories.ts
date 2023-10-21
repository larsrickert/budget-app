import { TransactionFrequency } from "@/composables/use-transaction";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./EditTransactionTemplate.vue";

const meta = {
  component: Component,
  argTypes: {
    onDelete: { action: "delete" },
    onSubmit: { action: "submit" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    headline: "New transaction",
    submitLabel: "Create",
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Primary.args,
    disabled: true,
  },
} satisfies Story;

export const SubmitLoading = {
  args: {
    ...Primary.args,
    submitLoading: true,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Primary.args,
    loading: true,
  },
} satisfies Story;

export const WithInitialValue = {
  args: {
    headline: "Edit transaction",
    submitLabel: "Update",
    initialValue: {
      name: "My transaction",
      value: 123.45,
      notes: "These are some notes.",
      type: "income",
      bookingDate: new Date().toISOString(),
      frequency: TransactionFrequency.MONTHLY,
    },
  },
} satisfies Story;

export const NotFound = {
  args: {
    ...Primary.args,
    notFound: true,
  },
} satisfies Story;
