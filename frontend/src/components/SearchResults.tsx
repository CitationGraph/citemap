import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SearchResults({ results }) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      <div className="flex-grow overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Title</TableHead>
              <TableHead className="w-[30%]">Author</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((paper, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{paper.title}</TableCell>
                <TableCell>{paper.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
