import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { Primary as FinanceItemListStory } from "../organisms/FinanceItemListOrganism.stories";
import Component from "./TransactionsTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    type: "outcome",
    transactions: FinanceItemListStory.args?.items ?? [],
    pageCount: 10,
    currentPage: 2,
    totals: {
      income: FinanceItemListStory.args?.items?.length ?? 0,
      outcome: FinanceItemListStory.args?.items?.length ?? 0,
    },
  },
};

export const Empty: StoryObj<Args> = {
  args: {
    ...Primary.args,
    transactions: [],
  },
};

export const Loading: StoryObj<Args> = {
  args: {
    ...Primary.args,
    loading: true,
  },
};
