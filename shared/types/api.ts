export type PaginatedList<T> = {
  items: T[];
  total: number;
  pageSize: number;
  page: number;
  pages: number;
};
