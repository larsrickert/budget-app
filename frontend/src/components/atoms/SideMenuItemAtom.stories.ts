import type { VueProps } from "@/types/vue";
import { House } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./SideMenuItemAtom.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    label: "Nav Item 1",
    icon: House,
  },
};

export const Active: StoryObj<Args> = {
  args: {
    ...Primary.args,
    active: true,
  },
};
