export type QueryFilter = {
  name: string;
  value: string;
};

export type TStore = {
  queryFilters: QueryFilter[];
  setQueryFilters: (queryFilters: QueryFilter[]) => void;
  addQueriesFilters: (queryFilter: QueryFilter[]) => void;
  deleteQueryFilter: (index: number) => void;
};
