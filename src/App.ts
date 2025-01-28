import { html } from "lit-html";
import { SearchInput } from "./components/SearchInput";
import { ResultsUI } from "./components/ResultsUI";
import FiltersUI from "./components/FiltersUI";

export default function App() {
  return html`
    <div class="bg-yellow-100 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <!-- Search Bar -->
        <header class="bg-white py-4 rounded-lg shadow-md mb-6">
          ${SearchInput()}
        </header>

        <div
          id="search-results-container"
          class="grid grid-cols-4 gap-6"
        >
          <!-- Sidebar Filters -->
          <aside class="col-span-1 ">
            <div id="filters">
                ${FiltersUI()}
            </div>
          </aside>

          <!-- Results -->
          <main class="col-span-3">
            <div id="results">
                ${ResultsUI()}
            </div>
          </main>
        </div>
      </div>
    </div>
  `;
}
