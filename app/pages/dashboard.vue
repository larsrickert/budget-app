<script lang="ts" setup>
import { iconPlus, iconWallet } from "@sit-onyx/icons";

definePageMeta({ layout: false, middleware: ["authenticated"] });

const { t } = useI18n();
useHead({
  title: computed(() => t("dashboard")),
});

const localePath = useLocalePath();

const { data: accounts, status: accountsStatus } = await useFetch("/api/accounts");

const { data: statistics, status: statisticStatus } = await useFetch(
  "/api/transactions/statistics/monthly",
);

const { data: budgetDevelopment, status: budgetDevelopmentStatus } = await useFetch(
  "/api/transactions/statistics/budget-development",
);
</script>

<template>
  <NuxtLayout name="default" :headline="$t('dashboard')">
    <div class="sections">
      <section>
        <OnyxHeadline is="h2" class="sections__headline">
          {{ $t("accounts.account", 2) }}

          <OnyxIconButton
            :label="$t('accounts.createNew')"
            :icon="iconPlus"
            :link="localePath('/accounts/new')"
          />
        </OnyxHeadline>

        <FinanceList
          :items="accounts ?? []"
          :skeleton="accountsStatus === 'pending'"
          :icon="iconWallet"
          link="/accounts"
        />
      </section>

      <section>
        <OnyxHeadline is="h2" class="sections__headline">
          {{ $t("statistics.monthlyOverview") }}
        </OnyxHeadline>

        <TransactionStatisticCards :statistics :skeleton="statisticStatus === 'pending'" />
      </section>

      <section>
        <OnyxHeadline is="h2" class="sections__headline">
          {{ $t("statistics.budgetDevelopment.headline") }}
        </OnyxHeadline>

        <BudgetDevelopment
          :data="budgetDevelopment"
          :skeleton="budgetDevelopmentStatus === 'pending'"
        />
      </section>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.sections {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-2xl);

  &__headline {
    margin-bottom: var(--onyx-density-md);
    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);
  }
}
</style>
