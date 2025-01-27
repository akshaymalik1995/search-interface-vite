import { Filter } from "../types";
import FilterCheckbox from "./FilterCheckbox";
import { html, render } from "lit-html";

function FiltersUI(props: { filters: Filter[] }) {
  const { filters } = props;

  const template = html`
    <div class="p-4 bg-gray-100">
      <h2 class="text-xl font-semibold mb-4">Filter by Ingredients</h2>
      <div>${filters.map((filter) => FilterCheckbox({ filter }))}</div>
    </div>
  `;

  render(template, document.getElementById("filters")!);
}

export default FiltersUI;
