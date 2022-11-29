import logoSrc from "@/assets/logo.svg";
import type { VueProps } from "@/types/vue";
import { House } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./SideMenuTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    title: "Title",
    subtitle: "Subtitle",
    logoSrc,
    navItems: [
      {
        label: "Nav Item 1",
        icon: House,
        href: "/",
      },
      {
        label: "Nav Item 2",
        icon: House,
        href: "/test1",
      },
    ],
    subItems: [
      {
        label: "Nav Item 1",
        icon: House,
        href: "/test2",
      },
      {
        label: "Nav Item 2",
        icon: House,
        href: "/test3",
      },
    ],
    activeHref: "/test1",
  },
};

export const WithoutSubItems: StoryObj<Args> = {
  args: {
    ...Primary.args,
    subItems: [],
  },
};

export const WithDrawer: StoryObj<Args> = {
  args: {
    ...Primary.args,
    isDrawerOpen: true,
  },
};
