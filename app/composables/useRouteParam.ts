export const useRouteParam = (param: string) => {
  const route = useRoute();

  const value = computed(() => {
    const paramValue = route.params[param];
    const singleValue = Array.isArray(paramValue) ? paramValue[0] : paramValue;
    return singleValue ?? "";
  });

  return value;
};
