import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import ActionsMenu from './ActionsMenu'

interface Column {
  id: 'name' | 'vendorNumber' | 'markers' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Име' },
  {
    id: 'vendorNumber',
    label: 'Доставчик №',
    format: (value: number) => value.toLocaleString('en-US')
  },
  { id: 'markers', label: 'Маркери' },
  { id: 'actions', label: 'Действия', minWidth: 50, align: 'right' }
]

interface Data {
  name: string
  vendorNumber: number
  markers: string
  actions: React.ReactNode
}

function createData(
  name: string,
  vendorNumber: number,
  markers: string,
  actions: React.ReactNode
): Data {
  return { name, vendorNumber, markers, actions }
}

const rows = [
  createData('Bosch', 1, 'Масло', <ActionsMenu />),
  createData('Valeo', 2, 'Масло', <ActionsMenu />),
  createData('ACDelco', 3, 'Масло', <ActionsMenu />),
  createData('Febi Bilstein', 4, 'Масло', <ActionsMenu />),
  createData('Delphi', 5, 'Масло', <ActionsMenu />),
  createData('Castrol', 6, 'Масло', <ActionsMenu />),
  createData('Monroe', 7, 'Масло', <ActionsMenu />),
  createData('Continental', 8, 'Масло', <ActionsMenu />),
  createData('BREMBO', 9, 'Масло', <ActionsMenu />),
  createData('ZF Group', 10, 'Масло', <ActionsMenu />),
  createData('Proba', 11, 'Масло', <ActionsMenu />),
  createData('Proba', 12, 'Масло', <ActionsMenu />),
  createData('Proba', 13, 'Масло', <ActionsMenu />),
  createData('Proba', 14, 'Масло', <ActionsMenu />),
  createData('Proba', 15, 'Масло', <ActionsMenu />)
]

export default function VendorsTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.vendorNumber}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={column.id === 'actions' ? { width: 50, paddingRight: '2em' } : {}}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
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
  )
}
