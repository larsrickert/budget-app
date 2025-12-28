<script lang="ts" setup>
import {
  type ColumnConfig,
  type ColumnGroupConfig,
  type ColumnTypesFromFeatures,
  createFeature,
  DataGridFeatures,
} from "sit-onyx";

// add your custom features with types here so the custom column types are inferred correctly
type CustomColumnTypes = ColumnTypesFromFeatures<typeof withCustomTypes>;
type Entry = (typeof data.value)[number];

const props = defineProps<{
  /**
   * A list of overdue transactions.
   */
  transactions: OverdueTransaction[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  adjust: [ids: Transaction["id"][]];
}>();

const { t, d, n } = useI18n();

const isOpen = ref(false);

const data = computed(() => {
  return props.transactions.map((item) => ({
    ...item.transaction,
    nextBookingDate: item.nextBookingDate,
  }));
});

const width = "minmax(max-content, 1fr)";

const columns: ColumnConfig<Entry, ColumnGroupConfig, CustomColumnTypes>[] = [
  { key: "name", label: t("name"), width },
  { key: "bookingDate", label: t("transactions.bookingDate"), type: "date", width },
  {
    key: "nextBookingDate",
    label: t("transactions.overdue.newBookingDate"),
    type: "nextBookingDate",
    width,
  },
  { key: "value", label: t("value"), type: "currency", width },
];

const selectionState = ref<DataGridFeatures.SelectionState>({
  selectMode: "include",
  contingent: new Set(),
});

const withSelection = DataGridFeatures.useSelection<Entry>({
  selectionState,
});

const selectedIds = computed(() => {
  if (selectionState.value.selectMode === "include") {
    return Array.from(selectionState.value.contingent.values()) as Transaction["id"][];
  } else {
    const allIDs = data.value.map(({ id }) => id);
    return allIDs.filter((id) => !selectionState.value.contingent.has(id));
  }
});

const withSorting = DataGridFeatures.useSorting<Entry>();

const withCustomTypes = createFeature(() => ({
  name: Symbol("customTypes"),
  typeRenderer: {
    currency: DataGridFeatures.createTypeRenderer<object, Entry>({
      cell: {
        component: ({ modelValue }) => {
          if (typeof modelValue !== "number") return;
          return n(modelValue, "currency");
        },
      },
    }),
    nextBookingDate: DataGridFeatures.createTypeRenderer<object, Entry>({
      cell: {
        component: ({ modelValue }) => {
          if (!modelValue) return t("delete");
          return d(modelValue, "date");
        },
      },
    }),
  },
}));

const features = [withSelection, withSorting, withCustomTypes];

const handleSubmit = () => {
  emit("adjust", selectedIds.value.slice());
  isOpen.value = false;
};
</script>

<template>
  <OnyxInfoCard :headline="$t('transactions.overdue.headline')">
    {{ $t("transactions.overdue.description", props.transactions.length) }}

    <template #buttons>
      <OnyxButton
        :label="$t('transactions.overdue.checkNow')"
        color="neutral"
        :loading="props.loading"
        @click="isOpen = true"
      />
    </template>
  </OnyxInfoCard>

  <OnyxModal v-model:open="isOpen" class="modal" :label="$t('transactions.overdue.headline')">
    <template #description> {{ $t("transactions.overdue.modal.description") }} </template>

    <div class="modal__content">
      <OnyxDataGrid :columns :data :features />
    </div>

    <template #footer>
      <OnyxBottomBar>
        <OnyxButton :label="$t('cancel')" color="neutral" mode="plain" @click="isOpen = false" />
        <OnyxButton
          :label="$t('transactions.overdue.adjust')"
          :disabled="!selectedIds.length"
          @click="handleSubmit"
        />
      </OnyxBottomBar>
    </template>
  </OnyxModal>
</template>

<style lang="scss" scoped>
.modal {
  width: 64rem;

  :deep(.onyx-basic-dialog__content) {
    max-width: 100%;
  }

  &__content {
    padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
  }
}
</style>
