import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./EditAccountTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    headline: "New account",
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
    headline: "Edit account",
    submitLabel: "Update",
    initialValue: {
      name: "My account",
      value: 123.45,
      notes: "These are some notes.",
    },
  },
};

export const NotFound: StoryObj<Args> = {
  args: {
    ...Primary.args,
    notFound: true,
  },
};
