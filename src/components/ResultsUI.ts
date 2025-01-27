import { html, render } from "lit-html";
import { Result } from "../types";
import { ResultCard } from "./ResultCard";

export function ResultsUI(props: { results: Result[] }) {
  const { results } = props;
  const template = html`
    <div class="grid grid-cols-2 gap-6">
      ${results.map((result) => ResultCard({ result }))}
    </div>
  `;

  return template;
}

export function renderResultsUI(props: { results: Result[] }) {
  const { results } = props;
  const template = ResultsUI({ results });
  render(template, document.getElementById("results")!);
}
