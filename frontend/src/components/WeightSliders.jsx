import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
// import type Weights from "@/types/weights"

const sliderConfig = [
  // { name: 'salsa', label: 'SALSA' },
  { name: 'hits', label: 'HITS' },
  { name: 'pageRank', label: 'PageRank' },
  // { name: 'eigenvector', label: 'Eigenvector' },
  // { name: 'semanticSimilarity', label: 'Semantic Similarity' },
  // { name: 'publishDate', label: 'Publish Date' },
]

export default function WeightSliders({ weights, setWeights }) {
  const handleSliderChange = (name, value ) => {
    setWeights((prev) => ({ ...prev, [name]: value[0] }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
      {sliderConfig.map(({ name, label }) => (
        <div key={name} className="space-y-1">
          <Label htmlFor={name} className="text-xs flex justify-between">
            <span>{label}</span>
            <span>{weights[name].toFixed(2)}</span>
          </Label>
          <Slider
            id={name}
            min={0}
            max={1}
            step={0.01}
            value={[weights[name]]}
            onValueChange={(value) => handleSliderChange(name, value)}
          />
        </div>
      ))}
    </div>
  )
}
