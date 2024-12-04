"use client"

import React, { useEffect, useRef } from 'react'
import Graph from 'graphology'
import Sigma from 'sigma'
import forceAtlas2 from 'graphology-layout-forceatlas2'
import FA2Layout from 'graphology-layout-forceatlas2/worker'
import type { Jon100Data } from 'src/types/jon100data'

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

export default function SigmaNetwork({ topResults, subgraph }: { topResults: Jon100Data['results'], subgraph: Jon100Data["subgraph"] | undefined }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize the graph
    const graph = new Graph()

    if (!subgraph) return
    // Add nodes to the graph
    subgraph.nodes.forEach((paper) => {
      const topResult =  topResults.find(result => result.paper_id === paper.id)
      graph.addNode(paper.id, {
        x: Math.random() * 1,
        y: Math.random() * 1,
        size: topResult != undefined ? topResult.overall_score * 20: 3,
        label: paper.title || "Untitled",
        color: topResult != undefined ? randomColor() : 'gray',
      })
    })

    // Add edges to the graph
    subgraph.links.forEach((link) => {
      graph.addEdge(link.source, link.target)
    })

    // Initialize Sigma
    const renderer = new Sigma(graph, containerRef.current as HTMLElement, {
      minCameraRatio: .1,
      maxCameraRatio: 2,
    })

    const camera = renderer.getCamera();
    camera.ratio = .6

    // Initialize the force atlas 2 layout
    const sensibleSettings = forceAtlas2.inferSettings(graph);
    const fa2Layout = new FA2Layout(graph, {
      settings: sensibleSettings,
    });

    // Start the force atlas 2 layout
    fa2Layout.start();

    // Cleanup
    return () => {
      renderer.kill()
    }
  }, [subgraph])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
