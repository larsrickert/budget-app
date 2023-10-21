import { House } from "@element-plus/icons-vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./SideMenuItemAtom.vue";

const meta = {
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    label: "Nav Item 1",
    icon: House,
  },
} satisfies Story;

export const WithImage = {
  args: {
    ...Primary.args,
    img: "https://picsum.photos/200/100",
  },
} satisfies Story;

export const Active = {
  args: {
    ...Primary.args,
    active: true,
  },
} satisfies Story;
