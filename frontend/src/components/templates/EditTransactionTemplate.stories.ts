import { TransactionFrequency } from "@/composables/use-transaction";
import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./EditTransactionTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    headline: "New transaction",
    submitLabel: "Create",
  },
};

export const Disabled: StoryObj<Args> = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const SubmitLoading: StoryObj<Args> = {
  args: {
    ...Primary.args,
    submitLoading: true,
  },
};

export const Loading: StoryObj<Args> = {
  args: {
    ...Primary.args,
    loading: true,
  },
};

export const WithInitialValue: StoryObj<Args> = {
  args: {
    headline: "Edit transaction",
    submitLabel: "Update",
    initialValue: {
      name: "My transaction",
      value: 123.45,
      notes: "These are some notes.",
      type: "outcome",
      bookingDate: new Date().toISOString(),
      frequency: TransactionFrequency.MONTHLY,
    },
  },
};

export const NotFound: StoryObj<Args> = {
  args: {
    ...Primary.args,
    notFound: true,
  },
};
