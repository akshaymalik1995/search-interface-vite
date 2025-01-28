import { html, render } from "lit-html";
import { ResultCard } from "./ResultCard";
import { $filteredResults } from "../state";

export function ResultsUI() {
  const results = $filteredResults.getValue();
  const template = html`
    <div class="grid grid-cols-2 gap-6">
      ${results.map((result) => ResultCard({ result }))}
    </div>
  `;

  return template;
}

$filteredResults.addListener(() => {
  const root = document.getElementById("results");
  render(ResultsUI(), root!);
});

