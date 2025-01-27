import { Result } from "./types"
import { createFiltersFromResults } from "./components/utils"
import { $filteredResults, $filters, $isSearchOn, $results } from "./state"

const BACKEND_URL = 'http://localhost:5000/recipes'

class App {

  constructor() {
    this.addEventListeners()
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
        $filteredResults.set([])
        return
      }
      this.fetchResults(searchValue)
    })
  }

  

  async fetchResults(searchValue?: string): Promise<void> {
    const url = BACKEND_URL
    const response = await fetch(url)
    const results = await response.json()
    const searchResults = results.filter((result: Result) => result.title.toLowerCase().includes(searchValue?.toLowerCase() || ''))
    $results.set(searchResults)
    $filteredResults.set(searchResults)
    const filters = createFiltersFromResults(searchResults)
    $filters.set(filters)
    if (searchResults.length === 0) {
      $isSearchOn.set(false)
    } else {
      $isSearchOn.set(true)
    }
  }

  filterResults(filters: string[]) {
    const results = $results.getValue()
    if (filters.length === 0) {
      $filteredResults.set(results)
      return
    }
    const filteredResults = results.filter(result => {
      return result.ingredients.some(ingredient => filters.includes(ingredient))
    })
    $filteredResults.set(filteredResults)
  }
}

new App()