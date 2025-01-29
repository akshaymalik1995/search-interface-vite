import { html, render } from "lit-html";
import { ResultCard } from "./ResultCard";
import { $filteredResults } from "../state";

let oldResults: any = [];

export function ResultsUI() {
  const results = $filteredResults.getValue();
  if (results === oldResults) return;
  oldResults = results;
  const template = html`
    <div class="grid grid-cols-2 gap-6">
      ${results.map((result) => ResultCard({ result }))}
    </div>
  `;

  return template;
}

$filteredResults.addListener(() => {
  const root = document.getElementById("results");
  if (!root) return;
  render(ResultsUI(), root!);
});

