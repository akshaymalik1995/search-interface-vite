import { Filter, Result } from "../types"

export function createFiltersFromResults(results: Result[]): Filter[] {
    const filters = results.reduce((acc, result) => {
        result.ingredients.forEach(ingredient => {
            const existingFilter = acc.find(filter => filter.title === ingredient)
            if (existingFilter) {
                existingFilter.count++
            } else {
                acc.push({ id: acc.length + 1, title: ingredient, count: 1 })
            }
        })
        return acc
    }, [] as Filter[])
    return filters
}

export async function fetchResults(searchValue?: string): Promise<Result[]> {
    const url = 'http://localhost:5000/recipes'
    const response = await fetch(url)
    const results = await response.json()
    const searchResults = results.filter((result: Result) => result.title.toLowerCase().includes(searchValue?.toLowerCase() || ''))
    return searchResults
}