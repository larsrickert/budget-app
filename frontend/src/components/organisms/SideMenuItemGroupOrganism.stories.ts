import type { VueProps } from "@/types/vue";
import { House } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./SideMenuItemGroupOrganism.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    items: [
      {
        label: "Nav Item 1",
        icon: House,
        href: "/",
      },
      {
        label: "Nav Item 2",
        icon: House,
        href: "/test",
      },
    ],
    activeHref: "/",
  },
};
