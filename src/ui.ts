
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