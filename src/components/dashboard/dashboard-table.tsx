import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardTable({
  rows,
}: {
  rows: { type: string; quantity: number | undefined }[];
}) {
  if (rows.some((row) => row.quantity === undefined))
    return (
      <div className="w-full">
        Ocorreu um erro ao carregar as quantidades. Por favor, tente novamente.
      </div>
    );
  return (
    <Table>
      <TableCaption>
        As quantidades de estoques, categorias e produtos.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo de armazenamento</TableHead>
          <TableHead>Quantidade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.type}>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
