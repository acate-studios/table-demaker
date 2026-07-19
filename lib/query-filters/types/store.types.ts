export type queryFilters = {
  name: string;
  value: string;
};

export type TStore = {
  queryFilters: queryFilters[];
  setQueryFilters: (queryFilters: queryFilters[]) => void;
  addQueriesFilters: (queryFilter: queryFilters[]) => void;
  deleteQueryFilter: (index: number) => void;
};
