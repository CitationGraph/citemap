import json
import heapq

def load_graph_from_file(file_path):
    with open(file_path, 'r') as file:
        graph = json.load(file)
    return graph

def dijkstras():
    def dijkstra(graph, start):
        queue = []
        heapq.heappush(queue, (0, start))
        distances = {node: float('infinity') for node in graph}
        distances[start] = 0
        while queue:
            current_distance, current_node = heapq.heappop(queue)
            if current_distance > distances[current_node]:
                continue
            for neighbor, weight in graph[current_node].items():
                distance = current_distance + weight
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    heapq.heappush(queue, (distance, neighbor))
        return distances

    graph = load_graph_from_file('data/sample.jsonl')
    print(dijkstra(graph, 'A'))

def bfs():
    def bfs(graph, start):
        visited = set()
        queue = [start]
        visited.add(start)
        while queue:
            node = queue.pop(0)
            print(node, end=" ")
            for neighbor in graph[node]:
                if neighbor not in visited:
                    queue.append(neighbor)
                    visited.add(neighbor)

    graph = load_graph_from_file('data/sample.jsonl')
    bfs(graph, 'A')

def dfs():
    def dfs(graph, start, visited=None):
        if visited is None:
            visited = set()
        visited.add(start)
        print(start, end=" ")
        for neighbor in graph[start]:
            if neighbor not in visited:
                dfs(graph, neighbor, visited)

    graph = load_graph_from_file('data/sample.jsonl')
    dfs(graph, 'A')
