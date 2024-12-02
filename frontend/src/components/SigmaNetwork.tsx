"use client"

import React, { useEffect, useRef } from 'react'
import Graph from 'graphology'
import Sigma from 'sigma'

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

export default function SigmaNetwork() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize the graph
    const graph = new Graph()

    for (let i = 0; i < 100; i++) {
      graph.addNode(i.toString(), { x: Math.random(), y: Math.random(), size: 5, label: `Node ${i}`, color: randomColor() })
    }

    // Add edges
    for (let i = 0; i < 100; i++) {
      const target = Math.floor(Math.random() * 100)
      graph.addEdge(i.toString(), target.toString())
    }

    // Initialize Sigma
    const renderer = new Sigma(graph, containerRef.current, {
      minCameraRatio: 0.1,
      maxCameraRatio: 10,
    })

    const camera = renderer.getCamera();

    // Cleanup
    return () => {
      renderer.kill()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
