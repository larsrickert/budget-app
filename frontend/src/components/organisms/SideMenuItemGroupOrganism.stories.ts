import { House } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./SideMenuItemGroupOrganism.vue";

const meta = {
  component: Component,
  argTypes: {
    onItemClick: { action: "itemClick" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
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
} satisfies Story;
