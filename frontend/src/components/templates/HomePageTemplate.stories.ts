import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { Primary as FinanceItemListStory } from "../organisms/FinanceItemListOrganism.stories";
import Component from "./HomePageTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    accounts: FinanceItemListStory.args?.items ?? [],
    income: 59.99,
    outcome: 19.99,
    budget: 49,
    budgetPercentage: 40,
    budgetDevelopment: {
      items: [
        {
          date: new Date().toISOString(),
          budget: 100,
        },
        {
          date: new Date().toISOString(),
          budget: -100,
        },
      ],
    },
  },
};

export const Loading: StoryObj<Args> = {
  args: {
    ...Primary.args,
    isAccountsLoading: true,
    isMonthlyLoading: true,
    isBudgetDevelopmentLoading: true,
    budgetDevelopment: undefined,
  },
};

export const Empty: StoryObj<Args> = {
  args: {
    accounts: [],
    budgetDevelopment: undefined,
  },
};
