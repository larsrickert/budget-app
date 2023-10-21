import type { Meta, StoryObj } from "@storybook/vue3";
import { Primary as FinanceItemListStory } from "../organisms/FinanceItemListOrganism.stories";
import { Primary as OverdueTransactionDialogOrganismPrimary } from "../organisms/OverdueTransactionDialogOrganism.stories";
import Component from "./TransactionsTemplate.vue";

const meta = {
  component: Component,
  argTypes: {
    onEditOverdue: { action: "editOverdue" },
    onItemClick: { action: "itemClick" },
    "onUpdate:currentPage": { action: "update:currentPage" },
    "onUpdate:type": { action: "update:type" },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    type: "income",
    transactions: FinanceItemListStory.args?.items ?? [],
    pageCount: 10,
    currentPage: 2,
    totals: {
      income: FinanceItemListStory.args?.items?.length ?? 0,
      outcome: FinanceItemListStory.args?.items?.length ?? 0,
    },
  },
} satisfies Story;

export const Empty = {
  args: {
    ...Primary.args,
    transactions: [],
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Primary.args,
    loading: true,
  },
} satisfies Story;

export const WithOverdueTransactions = {
  args: {
    ...Primary.args,
    overdueTransactions:
      OverdueTransactionDialogOrganismPrimary.args.transactions,
  },
} satisfies Story;
