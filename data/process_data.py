import json

# File paths
input_file= "datasetV1.txt"
output_file = "graph.json"

# Load raw data from a text file
def load_data(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

# Parse raw data into JSON
def parse_data(raw_data):
    papers = []
    paper = {}
    for line in raw_data.strip().split("\n"):
        if line.startswith("#*"):
            paper["title"] = line[2:]
        elif line.startswith("#@"):
            paper["authors"] = line[2:].split(",")
        elif line.startswith("#t"):
            paper["year"] = int(line[2:])
        elif line.startswith("#c"):
            paper["conference"] = line[2:] if line[2:] else None
        elif line.startswith("#!"):
            paper["abstract"] = line[2:]
        elif line.startswith("#index"):
            paper["id"] = int(line[6:])
            papers.append(paper)
            paper = {}
    return papers

# Build graph nodes and edges
def build_graph(papers):
    nodes = [{"id": str(paper["id"]), "label": paper["title"]} for paper in papers]
    edges = []

    # Add edges based on shared authors
    author_to_papers = {}
    for paper in papers:
        for author in paper.get("authors", []):
            if author not in author_to_papers:
                author_to_papers[author] = []
            author_to_papers[author].append(paper["id"])

    for author, paper_ids in author_to_papers.items():
        for i, source in enumerate(paper_ids):
            for target in paper_ids[i+1:]:
                edges.append({"source": str(source), "target": str(target)})

    return {"nodes": nodes, "edges": edges}

# Main script
def main(input_file, output_file):
    raw_data = load_data(input_file)
    papers = parse_data(raw_data)
    # graph_data = build_graph(papers)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(papers, f, indent=4)

    print(f"Graph data has been saved to {output_file}")

if __name__ == "__main__":
    main(input_file, output_file)