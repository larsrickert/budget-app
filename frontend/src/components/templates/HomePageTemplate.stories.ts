import type { Meta, StoryObj } from "@storybook/vue3";
import { Primary as FinanceItemListStory } from "../organisms/FinanceItemListOrganism.stories";
import Component from "./HomePageTemplate.vue";

const meta = {
  component: Component,
  argTypes: {
    onItemClick: { action: "itemClick" },
    "onUpdate:budgetDevelopmentSettings": {
      action: "update:budgetDevelopmentSettings",
    },
    "onUpdate:currentAccountPage": { action: "update:currentAccountPage" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
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
} satisfies Story;

export const Loading = {
  args: {
    ...Primary.args,
    isAccountsLoading: true,
    isTransactionSummaryLoading: true,
    isBudgetDevelopmentLoading: true,
    budgetDevelopment: undefined,
  },
} satisfies Story;

export const Empty = {
  args: {
    accounts: [],
    budgetDevelopment: {
      items: [{ budget: 0, date: new Date().toISOString() }],
      min: { budget: 0, date: new Date().toISOString() },
    },
    budgetDevelopmentSettings: {},
  },
} satisfies Story;
