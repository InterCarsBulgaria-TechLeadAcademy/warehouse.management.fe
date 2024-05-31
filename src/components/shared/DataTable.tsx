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
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Search, SearchIconWrapper, StyledInputBase } from '@/utils/searchInputStyles'
import { useTranslation } from 'react-i18next'

interface DataTableProps {
  searchInput: boolean
  isSortTextField: boolean
  sortLabel?: string
  sortOptionsData?: string[]
  columnsData: Column[]
  rowData: any
}

interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify'
  //   format?: (value: number) => string
}

export default function DataTable({
  searchInput,
  isSortTextField,
  sortLabel,
  sortOptionsData,
  columnsData,
  rowData
}: DataTableProps) {
  const { t: translate } = useTranslation()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [dense, setDense] = React.useState(false)

  const columns: readonly Column[] = columnsData
  const rows = rowData

  let options: any[] = []
  if (isSortTextField && sortOptionsData) {
    options = sortOptionsData.map((option) => ({ label: option }))
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '0.5em' }}>
        <Box component="div" sx={{ display: 'flex', gap: '2em', padding: '0.5em 0' }}>
          {searchInput && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={translate('vendors.labels.search')}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}

          {isSortTextField && (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={options}
              size="small"
              sx={{ width: '235px' }}
              renderInput={(params) => <TextField {...params} label={sortLabel} />}
            />
          )}
        </Box>

        <TableContainer sx={{ maxHeight: '60vh' }}>
          <Table stickyHeader aria-label="sticky table" size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.vendorNumber}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={column.id === 'actions' ? { width: 50, paddingRight: '2em' } : {}}>
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
          count={rows.length}
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
