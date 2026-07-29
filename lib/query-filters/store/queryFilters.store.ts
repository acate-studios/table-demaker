import { parseAsString, useQueryStates } from "nuqs";
import { useMemo } from "react";

import { queryFilters as TQueryFilter, TStore } from "../types/store.types";

// shallow stays default (true): the URL is the single source of truth and
// consumers read it client-side, so the server does not need to be notified.
const queryStateOptions = {
  history: "replace",
  clearOnDefault: true,
} as const;

const useQueryFilters = (names: string[]): TStore => {
  const namesKey = names.join("");
  const parsers = useMemo(
    () =>
      Object.fromEntries(names.map((name) => [name, parseAsString])) as Record<
        string,
        typeof parseAsString
      >,
    [namesKey],
  );

  const [values, setValues] = useQueryStates(parsers, queryStateOptions);

  const queryFilters: TQueryFilter[] = names
    .filter((name) => Boolean(values[name]))
    .map((name) => ({ name, value: values[name] as string }));

  const setQueryFilters: TStore["setQueryFilters"] = (newQueryFilters) => {
    const patch = Object.fromEntries(
      names.map((name) => [name, null]),
    ) as Record<string, string | null>;

    for (const { name, value } of newQueryFilters) {
      patch[name] = value || null;
    }

    void setValues(patch);
  };

  const addQueriesFilters: TStore["addQueriesFilters"] = (newQueryFilters) => {
    const patch = Object.fromEntries(
      newQueryFilters.map(({ name, value }) => [name, value || null]),
    ) as Record<string, string | null>;

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
