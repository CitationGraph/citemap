import type Paper from "../types/paper";
import type Weights from "../types/weights";

const mockPapers: Paper[] = [
  { title: "Advances in Machine Learning", author: "A. Smith", score: 0 },
  { title: "Quantum Computing: A New Era", author: "B. Johnson", score: 0 },
  { title: "The Future of Artificial Intelligence", author: "C. Williams", score: 0 },
  { title: "Blockchain Technology and Its Applications", author: "D. Brown", score: 0 },
  { title: "Cybersecurity in the Digital Age", author: "E. Davis", score: 0 },
];

export async function searchPapers(query: string, weights: Weights): Promise<Paper[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Calculate scores based on weights
  const results = mockPapers.map(paper => ({
    ...paper,
    score: calculateScore(weights)
  }));

  // Sort results by score in descending order
  return results.sort((a, b) => b.score - a.score);
}

function calculateScore(weights: Weights): number {
  const { salsa, hits, pageRank, eigenvector, semanticSimilarity, publishDate } = weights;
  const d = 0.5; // Assuming a default value for 'd' and 'i'
  const i = 0.5;

  return (
    ((salsa * salsa + hits * hits) * d) +
    ((pageRank * pageRank + eigenvector * eigenvector) * i) +
    (semanticSimilarity * semanticSimilarity) +
    (publishDate * publishDate)
  );
}
