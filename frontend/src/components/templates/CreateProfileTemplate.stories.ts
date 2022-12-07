import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./CreateProfileTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    headline: "Registration",
    submitLabel: "Submit",
  },
};

export const Disabled: StoryObj<Args> = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const Readonly: StoryObj<Args> = {
  args: {
    ...Primary.args,
    readonly: true,
  },
};

export const Loading: StoryObj<Args> = {
  args: {
    ...Primary.args,
    loading: true,
  },
};

export const WithInitialData: StoryObj<Args> = {
  args: {
    headline: "Edit profile",
    submitLabel: "Update",
    initialValue: {
      email: "example@example.de",
      username: "John Doe",
    },
  },
};
