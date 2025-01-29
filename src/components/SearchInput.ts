import { html } from "lit-html";
import { fetchResults } from "./utils";
import { $isSearchOn, $results } from "../state";

async function onChange(event: Event) {
  const search = (event.target as HTMLInputElement).value;
  const searchResults = await fetchResults(search);
  if (!searchResults.length) {
      if ($isSearchOn.getValue()) {
          $isSearchOn.set(false);
      }
  } else {
      $isSearchOn.set(true);
  }
  $results.set(searchResults);
}

export function SearchInput() {
  const template = html`
    <div class="flex flex-col gap-2 px-4">
      <!-- Search input field with aria-label for accessibility -->
      <input
        type="text"
        id="search"
        name="search"
        @input=${onChange}
        placeholder="Search recipes..."
        aria-label="Search recipes"
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
      />
      <!-- Suggested search terms -->
      <p class="text-sm text-gray-600 mt-2">
        Try:
        <span
          class="text-blue-600 cursor-pointer hover:underline hover:text-blue-800 transition duration-200"
          >Pizza</span
        >,
        <span
          class="text-blue-600 cursor-pointer hover:underline hover:text-blue-800 transition duration-200"
          >Pineapple</span
        >,
        <span
          class="text-blue-600 cursor-pointer hover:underline hover:text-blue-800 transition duration-200"
          >Kale</span
        >
      </p>
    </div>
  `;

  return template;
}
