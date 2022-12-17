import client, { type BaseRecord } from "@/pocketbase";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRecord = <T extends BaseRecord, CreateDto extends object>(
  collection: string
) => {
  const record = ref<T>();
  const isFetching = ref(false);
  const authStore = useAuthStore();
  const { t } = useI18n();

  const fetch = async (id: string) => {
    isFetching.value = true;
    try {
      record.value = await client.collection(collection).getOne<T>(id);
    } finally {
      isFetching.value = false;
    }
  };

  const create = async (dto: CreateDto) => {
    if (!authStore.user) throw new Error(t("global.unauthorizedAction"));
    record.value = await client
      .collection(collection)
      .create<T>({ ...dto, userId: authStore.user.id });
  };

  const update = async (dto: Partial<CreateDto>) => {
    if (!record.value) return;
    record.value = await client
      .collection(collection)
      .update<T>(record.value?.id, dto);
  };

  const remove = async () => {
    if (!record.value) return;
    return client.collection(collection).delete(record.value.id);
  };

  return { record, fetch, create, update, remove, isFetching };
};
