export interface Result {
  authors: string;
  overall_score: number;
  paper_id: string;
  title: string;
  year: string;
}

export interface Subgraph {
  directed: boolean;
  graph: object;
  links: { source: string; target: string }[];
  multigraph: boolean;
  nodes: {
    authors: string;
    id: string;
    title: string;
    venue: string;
    year: string;
  }[];
}

export interface Jon100Data {
  results: Result[];
  subgraph: Subgraph;
  success: boolean;
}