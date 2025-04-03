import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@/components/ui/button";
import SelectStatus from "./component/selectTable";
import { IconButton } from "@mui/material";
import { EditIcon } from "lucide-react";

const columns: any[] = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "produto", label: "Produto", minWidth: 170 },
  { id: "qtd", label: "Quantidade", minWidth: 100 },
  { id: "situação", label: "Situação", minWidth: 150 },
  { id: "opcoes", label: "Opções", minWidth: 100 },
];

const rows = [
  { id: "0", produto: "Computador", qtd: 10, situação: "Em operação" },
  { id: "1", produto: "Teclado", qtd: 10, situação: "Em operação" },
  { id: "2", produto: "Mouse", qtd: 10, situação: "Em operação" },
  { id: "3", produto: "Processador", qtd: 10, situação: "Em operação" },
  { id: "4", produto: "Memória RAM", qtd: 10, situação: "Inativo" },
  { id: "5", produto: "Placa de video", qtd: 10, situação: "Em operação" },
  { id: "6", produto: "SSD", qtd: 10, situação: "Em operação" },
  { id: "7", produto: "HD", qtd: 10, situação: "Em operação" },
  { id: "8", produto: "Fonte", qtd: 10, situação: "Em operação" },
  { id: "9", produto: "Monitor", qtd: 10, situação: "Em operação" },
  { id: "10", produto: "Web Cam", qtd: 10, situação: "Em operação" },
  { id: "11", produto: "Head Set", qtd: 10, situação: "Em operação" },
  { id: "12", produto: "Mouse Pad", qtd: 10, situação: "Em operação" },
  { id: "13", produto: "Notebook", qtd: 10, situação: "Em operação" },
  { id: "14", produto: "Carregador", qtd: 10, situação: "Em operação" },
  { id: "15", produto: "Impressora", qtd: 10, situação: "Em operação" },
];

const statusArray = [
  { id: 0, status: "Todos" },
  { id: 1, status: "Em operação" },
  { id: 2, status: "Inativo" },
  { id: 3, status: "Em manutenção" },
  { id: 4, status: "Obstruido" },
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [status, setStatus] = React.useState<string>("Todos");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="container mx-auto px-6 w-full">
      <Paper
        sx={{ width: "100%", borderRadius: "12px" }}
        className="bg-white p-6 rounded-xl my-5"
      >
        <div className="flex justify-between items-center w-full mb-5 p-5">
          <h2 className="text-lg font-semibold text-black">Produtos</h2>
          <div className="flex gap-2">
            <div className="min-w-[200px]">
              <SelectStatus
                statusArray={statusArray}
                setStatus={setStatus}
                status={status}
              />
            </div>
            <Button btnType="ghost" className="h-[40px]">
              Registrar Produto
            </Button>
            <Button btnType="dell" className="h-[40px]">
              Remover Produto
            </Button>
          </div>
        </div>
        <TableContainer sx={{ marginTop: "16px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      marginTop: "10px",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="center">
                        {column.id === "opcoes" ? (
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        ) : (
                          row[column.id as keyof typeof row]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
