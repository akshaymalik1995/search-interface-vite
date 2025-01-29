import { createFiltersFromResults } from "./components/utils";
import Signal from "./signal";
import { Filter, Result } from "./types";

export const $results: Signal<Result[]> = new Signal<Result[]>([]);
export const $filteredResults: Signal<Result[]> = new Signal<Result[]>([]);
export const $filters: Signal<Filter[]> = new Signal<Filter[]>([]);
export const $isSearchOn: Signal<boolean> = new Signal<boolean>(false);
export const $selectedFilters: Signal<string[]> = new Signal<string[]>([]);


$results.addListener((results) => {
  $selectedFilters.set([]);
  $filteredResults.set(results);
  $filters.set(createFiltersFromResults(results));
});

$selectedFilters.addListener((selectedFilters) => {
  console.log("Selected Filters", selectedFilters);
  const results = $results.getValue();
  const filteredResults = results.filter((result) =>
    selectedFilters.some((selectedFilter) =>
      result.ingredients.includes(selectedFilter)
    )
  );
  $filteredResults.set(filteredResults);
});
