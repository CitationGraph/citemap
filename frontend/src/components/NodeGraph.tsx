import SigmaNetwork from "./SigmaNetwork";

export default function NodeGraph() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Node Graph</h2>
      <div className="flex-grow bg-gray-100 rounded-lg flex items-center justify-center">
        {/* <p className="text-gray-600">Node Graph Placeholder (SigmaJS)</p> */}
        <SigmaNetwork />
      </div>
    </div>
  )
}
