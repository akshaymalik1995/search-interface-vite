import { $filters } from "../state";
import FilterCheckbox from "./FilterCheckbox";
import { html, render } from "lit-html";

export default function FiltersUI() {
  const filters = $filters.getValue();
  const template = html`
    <div class="p-4 bg-gray-100">
      <h2 class="text-xl font-semibold mb-4">Filter by Ingredients</h2>
      <div>${filters.map((filter) => FilterCheckbox({ filter }))}</div>
    </div>
  `;

  return template;
}

$filters.addListener(() => {
  const root = document.getElementById("filters");
  render(FiltersUI(), root!);
});
