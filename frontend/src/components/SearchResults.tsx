import type Paper from "@/types/paper";
import { useEffect } from "react";

function getColor(score: number): string {
  if (score >= 0.8) return 'text-green-500'; // High score
  if (score >= 0.5) return 'text-yellow-500'; // Medium score
  return 'text-red-500'; // Low score
}

export default function SearchResults({ results }: { results: Paper[] }) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Citation Explorer with Dynamic Scoring</h2>
      <div className="flex-grow overflow-auto">
        {results.map((paper: Paper, index: number) => (
          <div key={index} className="border-b py-4 hover:bg-gray-50">
            <h3 className="text-lg font-semibold">{paper.title || "Untitled"}</h3>
            <p className="text-sm">Authors: {paper.authors || "Unknown"}</p>
            <p className="text-sm">Year: {paper.year || "N/A"}</p>
            <p className={`text-sm ${getColor(paper.overall_score)}`}>
              Score: {paper.overall_score.toFixed(4)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
