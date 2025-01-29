import { Filter } from "../types";
import { $filteredResults, $results, $selectedFilters } from "../state";
import { html } from "lit-html";

export default function FilterCheckbox(props: { filter: Filter }) {
  const { id, title, count } = props.filter;

  function onFilterClick(value: string, checked: boolean) {
    const selectedFilters = $selectedFilters.getValue();
    if (checked) {
      selectedFilters.push(value);
    } else {
      const index = selectedFilters.indexOf(value);
      selectedFilters.splice(index, 1);
    }
    $selectedFilters.set(selectedFilters);
  }

  const template = html`
    <div class="mb-2 flex items-center">
      <input
        id="checkbox-${id}"
        type="checkbox"
        class="h-4 w-4 text-yellow-500 border-gray-300 focus:ring-yellow-400"
        @change=${(event: Event) => {
          const checked = (event.target as HTMLInputElement).checked;
          onFilterClick(title, checked);
        }}
      />
      <label for="checkbox-${id}" class="ml-2 text-gray-700">${title}</label>
      <span class="ml-auto text-gray-500">(${count})</span>
    </div>
  `;

  return template;
}
