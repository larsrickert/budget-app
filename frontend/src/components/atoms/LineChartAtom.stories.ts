import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./LineChartAtom.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
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
};

export const WithColor: StoryObj<Args> = {
  args: {
    ...Primary.args,
    color: "danger",
  },
};

export const WithYSTicksFormatter: StoryObj<Args> = {
  args: {
    ...Primary.args,
    yTicksFormatter: (value) => `Value: ${value}`,
  },
};

export const WithLimitedXTicks: StoryObj<Args> = {
  args: {
    ...Primary.args,
    maxXTicks: 3,
  },
};
