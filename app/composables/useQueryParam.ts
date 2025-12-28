export type UseQueryParamOptions<T extends string> = {
  /**
   * Query parameter name as used in the route.
   */
  name: string;
  defaultValue: T;
  /**
   * List of available values that the query is validated with on read.
   */
  whitelist?: T[];
};

export const useQueryParam = <T extends string>(options: UseQueryParamOptions<T>) => {
  const router = useRouter();
  const route = useRoute();

  const readQueryValue = () => {
    const value = route.query[options.name];
    const singleValue = Array.isArray(value) ? value[0] : value;
    const queryValue = singleValue || undefined;
    if (queryValue && options.whitelist?.length && !options.whitelist.includes(queryValue as T)) {
      return;
    }
    return queryValue as T | undefined;
  };

  const value = ref(readQueryValue() ?? options.defaultValue);

  watch(value, async (newValue) => {
    await router.replace({
      query: {
        ...route.query, // keep other query params
        [options.name]: newValue && newValue !== options.defaultValue ? newValue : undefined,
      },
    });
  });

  return value;
};
