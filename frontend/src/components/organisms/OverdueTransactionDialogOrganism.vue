<script lang="ts" setup>
import type {
  TransactionDto,
  TransactionFrequency,
} from "@/composables/use-transaction";
import { getNextFrequencyDate } from "@/utils/dates";
import { useVModel } from "@vueuse/core";
import { ElButton, ElCheckbox, ElDialog } from "element-plus";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import FinanceItemMolecule from "../molecules/FinanceItemMolecule.vue";

const props = defineProps<{
  transactions: TransactionDto[];
  visible?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  "update:visible": [value: boolean];
  select: [ids: string[]];
}>();

const { t, n, d } = useI18n();

const isVisible = useVModel(props, "visible", emit);

const selectedIds = ref<string[]>([]);

watch(
  () => props.transactions,
  () => (selectedIds.value = []),
);

const handleChange = (id: string, checked: boolean) => {
  if (checked && !selectedIds.value.includes(id)) {
    selectedIds.value.push(id);
  }
  if (!checked) {
    selectedIds.value = selectedIds.value.filter((i) => i !== id);
  }
};

const getSubtitle = computed(() => {
  return (bookingDate: string, frequency: TransactionFrequency) => {
    const currentDate = d(bookingDate, "date");
    const nextDate = d(getNextFrequencyDate(bookingDate, frequency), "date");
    return `${currentDate} - ${nextDate}`;
  };
});

const handleConfirm = () => {
  emit("select", selectedIds.value.slice());
};
</script>

<template>
  <el-dialog
    v-model="isVisible"
    :title="t('transactions.overdue.title', props.transactions.length)"
    width="600px"
    align-center
    destroy-on-close
  >
    <p>{{ t("transactions.overdue.dialog.description") }}</p>

    <div class="items">
      <el-checkbox
        v-for="transaction in props.transactions"
        :key="transaction.id"
        class="item"
        :checked="selectedIds.includes(transaction.id)"
        :disabled="props.loading"
        @change="handleChange(transaction.id, $event as boolean)"
      >
        <FinanceItemMolecule
          :title="transaction.name"
          :value="n(transaction.value, 'currency')"
          :subtitle="
            getSubtitle(transaction.bookingDate, transaction.frequency)
          "
          hide-arrow
        />
      </el-checkbox>
    </div>

    <template #footer>
      <el-button @click="isVisible = false">
        {{ t("global.cancel") }}
      </el-button>
      <el-button
        type="primary"
        :disabled="!selectedIds.length"
        :loading="props.loading"
        @click="handleConfirm"
      >
        {{ t("global.select") }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
p {
  margin-top: 0;
}

.items {
  display: grid;
  gap: var(--app-space-2);
}

.item {
  display: flex;
  gap: var(--app-space-2);
  margin-right: 0;

  :deep(.el-checkbox__label) {
    width: 100%;
  }
}
</style>
