import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Box, FormControlLabel, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Column } from '@/interfaces/Column'

interface DataTableProps<T> {
  columnsData: Column<T>[]
  rowData: T[]
  page: number
  rowsPerPage: number
  rowsCount?: number
  onPageChange: (newPage: number) => void
  onRowsPerPageChange: (newRowsPerPage: number) => void
  children?: React.ReactNode
}

export default function DataTable<T>({
  columnsData,
  rowData,
  page,
  rowsPerPage,
  rowsCount,
  onPageChange,
  onRowsPerPageChange,
  children
}: DataTableProps<T>) {
  const { t: translate } = useTranslation()
  const [dense, setDense] = React.useState(false)

  const columns: readonly Column<Record<any, any>>[] = columnsData

  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(+event.target.value)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '0.5em' }}>
        <Box
          component="div"
          sx={{ display: 'flex', gap: '2em', padding: '0.5em 0', alignItems: 'center' }}>
          {children}
        </Box>

        <TableContainer sx={{ maxHeight: '60vh' }}>
          <Table stickyHeader aria-label="sticky table" size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                {columnsData.map((column: Column<T>) => (
                  <TableCell
                    key={column.key.toString()}
                    align={column.align}
                    sx={{ minWidth: column.minWidth }}>
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsCount
                ? rowData
                : rowData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ).map((row: any) => {
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.key]
                      return (
                        <TableCell
                          key={column.key}
                          align={column.align}
                          sx={column.key === 'actions' ? { width: 50, paddingRight: '2em' } : {}}>
                          {value}
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
          count={rowsCount ? rowsCount : rowData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label={translate('table.densePadding')}
        />
      </Box>
    </Box>
  )
}
