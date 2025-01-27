import { html, render } from 'lit-html';
import { Result } from "../types";
import ResultCard from "./ResultCard";

function ResultsUI(props: { results: Result[] }) {
    const { results } = props;
    const template = html`
        <div class="grid grid-cols-2 gap-6">
            ${results.map(result => ResultCard({ result }))}
        </div>
    `;
    
    render(template, document.getElementById('results')!);

}
export default ResultsUI;