from flask import Flask, request, jsonify
from datetime import datetime
from algorithms import *

app = Flask(__name__)

@app.route('/')
def home():
    return "distant lands are calling"

@app.route('/heartbeat')
def heartbeat():
    return {
        "status": "ok",
        "version": "1.0.0",
        "name": "Citemap Backend",
        "date": datetime.now().strftime("%Y-%m-%d")
    }

@app.route('/v1/algorithm/papers')
def papers():
    return "List of papers"

@app.route('/v1/algorithm/dijkstra', methods=['POST'])
def dijkstra():
    data = request.get_json()
    graph = data['graph']
    start = data['start']
    return jsonify(dijkstra(graph, start))

@app.route('/v1/algorithm/bfs', methods=['POST'])
def bfs():
    data = request.get_json()
    graph = data['graph']
    start = data['start']
    return jsonify(bfs(graph, start))

@app.route('/v1/algorithm/dfs', methods=['POST'])
def dfs():
    data = request.get_json()
    graph = data['graph']
    start = data['start']
    return jsonify(dfs(graph, start))

if __name__ == "__main__":
    app.run(debug=True)
