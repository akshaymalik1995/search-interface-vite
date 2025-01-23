import Signal from "./signal"
import { Filter, Result } from "./types"
import ResultCard from "./components/ResultCard"
import FilterCheckbox from "./components/FilterCheckbox"

const BACKEND_URL = 'http://localhost:3000/recipes'

class App {

  private isSearchOn : Signal<boolean> = new Signal<boolean>(false)
  private results: Signal<Result[]> = new Signal<Result[]>([])
  private filters: Signal<Filter[]> = new Signal<Filter[]>([])
  private selectedFilters: Signal<string[]> = new Signal<string[]>([])
  constructor() {
    this.isSearchOn.addListener(isSearchOn => {
      console.log("isSearchOn", isSearchOn)
      this.onSearchToggle(isSearchOn)
    })
    this.results.addListener(results => this.addResultsToUI(results))
    this.filters.addListener((filters) => this.addFiltersToUI(filters))
    this.selectedFilters.addListener(selectedFilters => this.filterResults(selectedFilters))
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
        this.isSearchOn.set(false)
        this.results.set([])
        return
      }
      const isSearchOn = this.isSearchOn.getValue()
      if (!isSearchOn) {
        this.isSearchOn.set(true)
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
    this.results.set(searchResults)
    this.filters.set(this.createFiltersFromResults(this.results.getValue()))
    if (searchResults.length === 0) {
      console.log("No results found")
      this.isSearchOn.set(false)
    }
  }

  filterResults(filters: string[]) {
    const results = this.results.getValue()
    if (filters.length === 0) {
      this.addResultsToUI(results)
      return
    }
    const filteredResults = results.filter(result => {
      return result.ingredients.some(ingredient => filters.includes(ingredient))
    })
    this.addResultsToUI(filteredResults)
  }

  onFilterClick(value: string, checked: boolean) {
    this.selectedFilters.update(selectedFilters => {
      if (!checked) {
        return selectedFilters.filter(filter => filter !== value)
      }
      
      return [...selectedFilters, value]
    })
  }

  createFiltersFromResults(results: Result[]) {
    const filters = results.reduce((acc, result) => {
      result.ingredients.forEach(ingredient => {
        const existingFilter = acc.find(filter => filter.title === ingredient)
        if (existingFilter) {
          existingFilter.count++
        } else {
          acc.push({ id: acc.length + 1, title: ingredient, count: 1, onCheck: this.onFilterClick.bind(this) })
        }
      })
      return acc
    }, [] as Filter[])
    return filters
  }

  addFiltersToUI(filters: Filter[]) {
    const filtersContainer = document.getElementById('filters')!
    filtersContainer.innerHTML = ''
    filters.forEach(filter => {
      const filterCheckbox = FilterCheckbox(filter)
      filtersContainer.appendChild(filterCheckbox)
    })
  }

  addResultsToUI(results: Result[]) {
    console.log(results)
    const resultsContainer = document.getElementById('results')!
    resultsContainer.innerHTML = ''
    results.forEach(result => {
      const resultCard = ResultCard({ result })
      resultsContainer.innerHTML += resultCard
    })
  }
}

new App()