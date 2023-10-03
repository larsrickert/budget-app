import client from "@/pocketbase";
import { useOffsetPagination, type MaybeRef } from "@vueuse/core";
import type { RecordListOptions } from "pocketbase";

import { computed, ref, type Ref } from "vue";

export interface UsePaginationOptions {
  /** @default 15 */
  pageSize?: MaybeRef<number>;
  query?: RecordListOptions;
}

export const usePagination = <T extends object>(
  collection: string,
  options?: UsePaginationOptions,
) => {
  const total = ref(0);
  const isLoading = ref(false);
  const items = ref([]) as Ref<T[]>;
  const pagination = useOffsetPagination({
    total,
    pageSize: options?.pageSize ?? 15,
    onPageChange: async ({ currentPage, currentPageSize }) => {
      return fetchPage(currentPage, currentPageSize);
    },
    onPageSizeChange: async ({ currentPage, currentPageSize }) => {
      return fetchPage(currentPage, currentPageSize);
    },
  });

  const fetchPage = async (page: number, pageSize: number) => {
    isLoading.value = true;
    try {
      const list = await client
        .collection(collection)
        .getList<T>(page, pageSize, options?.query);
      items.value = list.items;
      total.value = list.totalItems;
    } finally {
      isLoading.value = false;
    }
  };

  const refetch = () => {
    return fetchPage(
      pagination.currentPage.value,
      pagination.currentPageSize.value,
    );
  };

  refetch();

  return {
    ...pagination,
    isLoading,
    items,
    refetch,
    // make total readonly
    total: computed(() => total.value),
  };
};
