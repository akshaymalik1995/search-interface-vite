import { Filter } from "../types"
import { $filteredResults } from "../state"

export default function FilterCheckbox(props: { filter: Filter }): HTMLElement {
    const { id, title, count } = props.filter
    const element = document.createElement('div')

    function onFilterClick(value: string, checked: boolean) {
        $filteredResults.update((results) => {
            if (checked) {
                const newResults = results.filter(result => result.ingredients.includes(value))
                return newResults
            } else {
                return results
            }
        })
    }

    element.innerHTML = `
            <div class="mb-2 flex items-center">
                <input id="checkbox-${id}" type="checkbox" class="h-4 w-4 text-yellow-500 border-gray-300 focus:ring-yellow-400">
                <label for="garlic" class="ml-2 text-gray-700">${title}</label>
                <span class="ml-auto text-gray-500">(${count})</span>
            </div>
            `
    element!.addEventListener('change', (event: Event) => {
        const checked = (event.target as HTMLInputElement).checked
        onFilterClick(title, checked)
    })
    return element
}