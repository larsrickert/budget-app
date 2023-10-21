import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./FileSelectOrganism.vue";

const meta = {
  component: Component,
  argTypes: {
    onChange: { action: "change" },
    onExceedFileSize: { action: "exceedFileSize" },
    onExceedLimit: { action: "exceedLimit" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {},
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const WithLimit = {
  args: {
    limit: 1,
  },
} satisfies Story;

export const WithReplace = {
  args: {
    limit: 2,
    replace: true,
  },
} satisfies Story;

export const WithAllowedFileTypes = {
  args: {
    allowedFileTypes: [".jpg", ".png"],
  },
} satisfies Story;

export const WithMaxSize = {
  args: {
    maxSize: 4,
  },
} satisfies Story;
