import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { Primary as FinanceItemListStory } from "../organisms/FinanceItemListOrganism.stories";
import Component from "./HomePageTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
  argTypes: {
    onItemClick: { action: "itemClick" },
    "onUpdate:budgetDevelopmentSettings": {
      action: "update:budgetDevelopmentSettings",
    },
    "onUpdate:currentAccountPage": { action: "update:currentAccountPage" },
  },
} as Meta<Args>;

export const Primary: StoryObj<Args> = {
  args: {
    accounts: FinanceItemListStory.args?.items ?? [],
    transactionSummary: {
      income: {
        monthlyTotal: 59.99,
      },
      outcome: {
        monthlyTotal: 19.99,
      },
      monthlyBudget: 40,
      budgetPercentageOfIncome: 66.67,
    },
    accountPageCount: 10,
    currentAccountPage: 2,
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
      min: {
        date: new Date().toISOString(),
        budget: -100,
      },
    },
    budgetDevelopmentSettings: {
      checkLength: 6,
      includePast: true,
    },
  },
};

export const Loading: StoryObj<Args> = {
  args: {
    ...Primary.args,
    isAccountsLoading: true,
    isTransactionSummaryLoading: true,
    isBudgetDevelopmentLoading: true,
    budgetDevelopment: undefined,
  },
};

export const Empty: StoryObj<Args> = {
  args: {
    accounts: [],
    budgetDevelopment: {
      items: [{ budget: 0, date: new Date().toISOString() }],
      min: { budget: 0, date: new Date().toISOString() },
    },
  },
};
