import logoSrc from "@/assets/logo.svg";
import { House } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./SideMenuTemplate.vue";

const meta = {
  component: Component,
  argTypes: {
    onItemClick: { action: "itemClick" },
    "onUpdate:isDrawerOpen": { action: "update:isDrawerOpen" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
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
        img: "https://picsum.photos/100",
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
} satisfies Story;

export const WithoutSubItems = {
  args: {
    ...Primary.args,
    subItems: [],
  },
} satisfies Story;

export const WithDrawer = {
  args: {
    ...Primary.args,
    isDrawerOpen: true,
  },
} satisfies Story;
