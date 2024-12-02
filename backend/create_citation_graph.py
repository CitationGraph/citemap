import networkx as nx
import json
import pickle

# Initialize a directed graph
citation_graph = nx.DiGraph()

# Path to the JSONL file
file_path = "sample.jsonl"

# Load data from JSONL and build the graph
with open(file_path, "r") as file:
    for line in file:
        paper = json.loads(line)
        paper_id = paper["paper_id"]
        title = paper["title"]

        # Add the paper as a node
        citation_graph.add_node(paper_id, title=title)

        # Add edges for outbound citations (citations made by this paper)
        for cited_paper in paper["outbound_citations"]:
            citation_graph.add_edge(paper_id, cited_paper)

# Save the graph using pickle
try:
    with open("citation_graph.pkl", "wb") as f:
        pickle.dump(citation_graph, f)
    print("Citation graph created and saved as 'citation_graph.pkl'")
except Exception as e:
    print(f"Error saving the graph: {e}")
