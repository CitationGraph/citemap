import pickle
import networkx as nx
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the citation graph
try:
    with open("citation_graph.pkl", "rb") as f:
        citation_graph = pickle.load(f)
    print("Citation graph loaded successfully.")
except Exception as e:
    print(f"Error loading the graph: {e}")
    citation_graph = nx.DiGraph()

@app.route('/search', methods=['GET'])
def search_papers():
    query = request.args.get('query', '').lower()
    results = [
        {"id": node, "title": data['title']}
        for node, data in citation_graph.nodes(data=True)
        if query in data['title'].lower()
    ]
    return jsonify(results)

@app.route('/related', methods=['GET'])
def get_related_papers():
    paper_id = request.args.get('id')
    if paper_id not in citation_graph:
        return jsonify({"error": "Paper not found"}), 404

    related = list(citation_graph.neighbors(paper_id))
    results = [
        {"id": node, "title": citation_graph.nodes[node]['title']}
        for node in related
    ]
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
