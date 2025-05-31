import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PostActions } from "./PostActions"


export default function TablePost({ posts }) {
  return (
    <Table>
      <TableCaption>Una lista de todos los blogs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Autor</TableHead>
          <TableHead className="text-right">Accion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody  className="odd:bg-muted even:bg-white">
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">{post.id}</TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.user.name}</TableCell>
            <TableCell className="text-right">
              <PostActions></PostActions>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
