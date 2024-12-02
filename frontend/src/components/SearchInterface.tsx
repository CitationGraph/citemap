import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import WeightSliders from './WeightSliders'
import SearchResults from './SearchResults'
import NodeGraph from './NodeGraph'
import { searchPapers } from 'src/utils/mockapi'

export default function SearchInterface() {
  const [query, setQuery] = useState('')
  const [weights, setWeights] = useState({
    salsa: 0.5,
    hits: 0.5,
    pageRank: 0.5,
    eigenvector: 0.5,
    semanticSimilarity: 0.5,
    publishDate: 0.5
  })
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    const searchResults = await searchPapers(query, weights)
    setResults(searchResults)
    setHasSearched(true)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className={`flex-grow overflow-hidden transition-opacity duration-300 ${hasSearched ? 'opacity-100' : 'opacity-0'}`}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20}>
            <div className="h-full p-4 overflow-auto">
              <SearchResults results={results} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="h-full p-4 overflow-auto">
              <NodeGraph />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className={`fixed z-10 w-full left-1/2 transform -translate-x-1/2 transition-all duration-300 ${hasSearched ? 'bottom-4 max-w-6xl' : 'top-1/2 -translate-y-1/2 max-w-2xl'}`}>
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-md shadow space-y-4 mx-4 sm:mx-8 md:mx-16">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter search query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
          {hasSearched && <WeightSliders weights={weights} setWeights={setWeights} />}
        </div>
      </div>
    </div>
  )
}
