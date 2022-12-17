import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./FileSelectOrganism.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {},
};

export const Disabled: StoryObj<Args> = {
  args: {
    disabled: true,
  },
};

export const WithLimit: StoryObj<Args> = {
  args: {
    limit: 1,
  },
};

export const WithReplace: StoryObj<Args> = {
  args: {
    limit: 2,
    replace: true,
  },
};

export const WithAllowedFileTypes: StoryObj<Args> = {
  args: {
    allowedFileTypes: [".jpg", ".png"],
  },
};

export const WithMaxSize: StoryObj<Args> = {
  args: {
    maxSize: 4,
  },
};
