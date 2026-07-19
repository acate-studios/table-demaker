import { parseAsString, useQueryStates } from "nuqs";

import { queryFilters as TQueryFilter, TStore } from "../types/store.types";

// Mirror of FilterItem's inputs().
const FILTER_FIELDS = ["DPI", "Name"] as const;

type FilterField = (typeof FILTER_FIELDS)[number];

const parsers = Object.fromEntries(
  FILTER_FIELDS.map((name) => [name, parseAsString]),
) as Record<FilterField, typeof parseAsString>;

// shallow stays default (true): data is fetched client-side via useApiQuery.
const queryStateOptions = {
  history: "replace",
  clearOnDefault: true,
} as const;

const useQueryFilters = (): TStore => {
  const [values, setValues] = useQueryStates(parsers, queryStateOptions);

  const queryFilters: TQueryFilter[] = FILTER_FIELDS.filter((name) =>
    Boolean(values[name]),
  ).map((name) => ({ name, value: values[name] as string }));

  const setQueryFilters: TStore["setQueryFilters"] = (newQueryFilters) => {
    const patch = Object.fromEntries(
      FILTER_FIELDS.map((name) => [name, null]),
    ) as Record<FilterField, string | null>;

    for (const { name, value } of newQueryFilters) {
      patch[name as FilterField] = value || null;
    }

    void setValues(patch);
  };

  const addQueriesFilters: TStore["addQueriesFilters"] = (newQueryFilters) => {
    const patch = Object.fromEntries(
      newQueryFilters.map(({ name, value }) => [name, value || null]),
    ) as Partial<Record<FilterField, string | null>>;

    void setValues(patch);
  };

  const deleteQueryFilter: TStore["deleteQueryFilter"] = (index) => {
    const target = queryFilters[index];
    if (target) {
      void setValues({ [target.name]: null });
    }
  };

  return {
    queryFilters,
    setQueryFilters,
    addQueriesFilters,
    deleteQueryFilter,
  };
};

export { useQueryFilters };
