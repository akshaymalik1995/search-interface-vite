
import Signal from './signal'
import { Filter, Result } from './types'
import { onSearchToggle } from './ui'
export const $results: Signal<Result[]> = new Signal<Result[]>([])
export const $filteredResults: Signal<Result[]> = new Signal<Result[]>([])
export const $filters: Signal<Filter[]> = new Signal<Filter[]>([])
export const $isSearchOn: Signal<boolean> = new Signal<boolean>(false)

$isSearchOn.addListener(isSearchOn => onSearchToggle(isSearchOn))

