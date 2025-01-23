import { Filter, Result } from "./types"
import Results from "./components/Results"
import FilterCheckboxList from "./components/FilterCheckboxList"
import { createFiltersFromResults } from "./components/utils"
import { $filters, $isSearchOn, $results, $selectedFilters } from "./state"

const BACKEND_URL = 'http://localhost:3000/recipes'

class App {

  constructor() {
    $isSearchOn.addListener(isSearchOn => {
      this.onSearchToggle(isSearchOn)
    })
    $results.addListener(results => this.addResultsToUI(results))
    $filters.addListener((filters) => this.addFiltersToUI(filters))
    $selectedFilters.addListener(selectedFilters => this.filterResults(selectedFilters))
    this.addEventListeners()
    this.fetchResults()
  }

  addEventListeners() {
    this._addInputSearchListener()
  }

  private _addInputSearchListener() {
    console.log("addInputSearchListener is called")
    const searchInput = document.getElementById('search')!
    
    searchInput.addEventListener('input', (event: Event) => {
      const searchValue = (event.target as HTMLInputElement).value
      if (!searchValue) {
        $isSearchOn.set(false)
        $results.set([])
        return
      }
      const isSearchOn = $isSearchOn.getValue()
      if (!isSearchOn) {
        $isSearchOn.set(true)
      }
      this.fetchResults(searchValue)
    })
  }

  onSearchToggle(isSearchOn: boolean) {
    console.log("onSearchToggle is called", isSearchOn)
    if (isSearchOn) {
      document.getElementById('search-results-container')!.classList.remove('hidden')
    } else {
      document.getElementById('search-results-container')!.classList.add('hidden')
    }
  }

  async fetchResults(searchValue?: string): Promise<void> {
    const url = BACKEND_URL
    const response = await fetch(url)
    const results = await response.json()
    const searchResults = results.filter((result: Result) => result.title.toLowerCase().includes(searchValue?.toLowerCase() || ''))
    $results.set(searchResults)
    $filters.set(createFiltersFromResults($results.getValue()))
    if (searchResults.length === 0) {
      $isSearchOn.set(false)
    }
  }

  filterResults(filters: string[]) {
    const results = $results.getValue()
    if (filters.length === 0) {
      this.addResultsToUI(results)
      return
    }
    const filteredResults = results.filter(result => {
      return result.ingredients.some(ingredient => filters.includes(ingredient))
    })
    this.addResultsToUI(filteredResults)
  }

  addFiltersToUI(filters: Filter[]) {
    const filtersContainer = document.getElementById('filters')!
    filtersContainer.innerHTML = ''
    filtersContainer.appendChild(FilterCheckboxList({ filters }))
  }

  addResultsToUI(results: Result[]) {
    const resultsContainer = document.getElementById('results')!
    resultsContainer.innerHTML = ''
    resultsContainer.appendChild(Results({ results }))
  }
}

new App()