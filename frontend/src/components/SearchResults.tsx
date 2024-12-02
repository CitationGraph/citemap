import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type Paper from "@/types/paper";

export default function SearchResults({ results }: { results: Paper[] }) {
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
            {results.map((paper: Paper, index: number) => (
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
