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

export default function SigmaNetwork({ topResult,subgraph }: {topResult:any, subgraph: Jon100Data["subgraph"] | undefined }) {
  const containerRef = useRef<HTMLDivElement>(null)

  console.log(topResult)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize the graph
    const graph = new Graph()

    if (!subgraph) return
    // Add nodes to the graph
    subgraph.nodes.forEach((paper) => {
      graph.addNode(paper.id, {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 5,
        label: paper.title || "Untitled",
        color: randomColor(),
      })
    })

    // Add edges to the graph
    subgraph.links.forEach((link) => {
      graph.addEdge(link.source, link.target)
    })

    // Initialize Sigma
    const renderer = new Sigma(graph, containerRef.current as HTMLElement, {
      minCameraRatio: 0.1,
      maxCameraRatio: 10,
    })

    const camera = renderer.getCamera();

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
