import FilterCheckboxList from "./components/FilterCheckboxList"
import Results from "./components/Results"
import { Filter, Result } from "./types"

/**
 * Adds filter checkboxes to the UI by updating the filters container element.
 * Clears any existing content in the container before adding new filters.
 * @param filters - Array of Filter objects to be displayed as checkboxes
 * @throws Error if element with id 'filters' is not found in the DOM
 */
export function addFiltersToUI(filters: Filter[]) {
    const filtersContainer = document.getElementById('filters')!
    filtersContainer.innerHTML = ''
    filtersContainer.appendChild(FilterCheckboxList({ filters }))
}


/**
 * Adds search results to the UI by appending them to a container element.
 * Clears any existing content in the container before adding new results.
 * 
 * @param results - An array of Result objects to be displayed in the UI
 * @throws Will throw an error if the element with id 'results' is not found
 */
export function addResultsToUI(results: Result[]) {
    const resultsContainer = document.getElementById('results')!
    resultsContainer.innerHTML = ''
    resultsContainer.appendChild(Results({ results }))
}

/**
 * Toggles the visibility of the search results container based on the search state.
 * @param isSearchOn - A boolean indicating whether the search is active (true) or inactive (false)
 */
export function onSearchToggle(isSearchOn: boolean) {
    if (isSearchOn) {
      document.getElementById('search-results-container')!.classList.remove('hidden')
    } else {
      document.getElementById('search-results-container')!.classList.add('hidden')
    }
}