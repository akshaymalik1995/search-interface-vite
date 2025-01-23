import { Filter } from "../types"

export default function FilterCheckbox(props: Filter) : HTMLElement {
    const { id, title, count, onCheck } = props
    const element = document.createElement('div')

    element.innerHTML = `
            <div class="mb-2 flex items-center">
                <input onclick() id="checkbox-${id}" type="checkbox" class="h-4 w-4 text-yellow-500 border-gray-300 focus:ring-yellow-400">
                <label for="garlic" class="ml-2 text-gray-700">${title}</label>
                <span class="ml-auto text-gray-500">(${count})</span>
            </div>
            `
    element!.addEventListener('change', (event: Event) => {
        
        console.log('clicked', (event.target as HTMLInputElement).checked)
        const checked = (event.target as HTMLInputElement).checked
        onCheck(title, checked)
    })
    return element
}