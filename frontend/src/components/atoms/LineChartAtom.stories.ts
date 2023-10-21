import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./LineChartAtom.vue";

const meta = {
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    xScaleLabel: "x scale label",
    yScaleLabel: "y scale label",
    items: [
      {
        label: "01.01.2022",
        value: 19.99,
      },
      {
        label: "01.02.2022",
        tooltipLabel: "Custom tooltip label",
        value: -42,
      },
      {
        label: "01.03.2022",
        value: 39.98,
      },
      {
        label: "01.04.2022",
        value: 59.97,
      },
      {
        label: "01.05.2022",
        value: 42,
      },
    ],
  },
} satisfies Story;

export const WithColor = {
  args: {
    ...Primary.args,
    color: "danger",
  },
} satisfies Story;

export const WithYSTicksFormatter = {
  args: {
    ...Primary.args,
    yTicksFormatter: (value) => `Value: ${value}`,
  },
} satisfies Story;

export const WithLimitedXTicks = {
  args: {
    ...Primary.args,
    maxXTicks: 3,
  },
} satisfies Story;
