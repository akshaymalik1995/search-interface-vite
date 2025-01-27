import FiltersUI from './components/FiltersUI'
import ResultsUI from './components/ResultsUI'
import Signal from './signal'
import { Filter, Result } from './types'
import { onSearchToggle } from './ui'
export const $results: Signal<Result[]> = new Signal<Result[]>([])
export const $filteredResults: Signal<Result[]> = new Signal<Result[]>([])
export const $filters: Signal<Filter[]> = new Signal<Filter[]>([])
export const $isSearchOn: Signal<boolean> = new Signal<boolean>(false)



$filters.addListener((filters) => FiltersUI({ filters }))
$filteredResults.addListener((results) => ResultsUI({ results }))
$isSearchOn.addListener(isSearchOn => onSearchToggle(isSearchOn))

