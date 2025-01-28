import { html, render } from "lit-html";
import { Result } from "../types";
import { ResultCard } from "./ResultCard";
import { $filteredResults } from "../state";

export function ResultsUI(props: { results: Result[] }) {
  const { results } = props;
  const template = html`
    <div class="grid grid-cols-2 gap-6">
      ${results.map((result) => ResultCard({ result }))}
    </div>
  `;

  return template;
}

$filteredResults.addListener((results) => {
  const root = document.getElementById("results");
  render(ResultsUI({ results }), root!);
});

