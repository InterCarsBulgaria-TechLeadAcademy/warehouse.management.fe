import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Box, FormControlLabel, Switch, TextField, Autocomplete } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SearchInput from '../features/SearchInput'

interface DataTableProps {
  hasSearchInput: boolean
  isSortTextField: boolean
  sortLabel?: string
  sortOptionsData?: string[]
  columnsData: Column[]
  rowData: any
}

// interface Column {
//   id: string
//   label: string
//   minWidth?: number
//   align?: 'right' | 'left' | 'center' | 'inherit' | 'justify'
// }

interface Column {
  key: string
  title: string
  minWidth?: number
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify'
}

export default function DataTable({
  hasSearchInput,
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
  const [searchTerm, setSearchTerm] = React.useState('')

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredRows = rows.filter((row: any) => {
    return columns.some((column) => {
      return row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '0.5em' }}>
        <Box component="div" sx={{ display: 'flex', gap: '2em', padding: '0.5em 0' }}>
          {hasSearchInput && (
            <SearchInput
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={translate('vendors.labels.search')}
            />
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
                    key={column.key}
                    align={column.align}
                    sx={{ minWidth: column.minWidth }}>
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.vendorNumber}>
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
          count={filteredRows.length}
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

// import * as React from 'react'
// import Paper from '@mui/material/Paper'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TablePagination from '@mui/material/TablePagination'
// import TableRow from '@mui/material/TableRow'
// import { Box, FormControlLabel, Switch, TextField, Autocomplete } from '@mui/material'
// import { useTranslation } from 'react-i18next'
// import SearchInput from '../features/SearchInput'

// interface DataTableProps {
//   hasSearchInput: boolean
//   isSortTextField: boolean
//   sortLabel?: string
//   sortOptionsData?: string[]
//   columnsData: Column[]
//   rowData: any
// }

// interface Column {
//   id: string
//   label: string
//   minWidth?: number
//   align?: 'right' | 'left' | 'center' | 'inherit' | 'justify'
// }

// export default function DataTable({
//   hasSearchInput,
//   isSortTextField,
//   sortLabel,
//   sortOptionsData,
//   columnsData,
//   rowData
// }: DataTableProps) {
//   const { t: translate } = useTranslation()
//   const [page, setPage] = React.useState(0)
//   const [rowsPerPage, setRowsPerPage] = React.useState(10)
//   const [dense, setDense] = React.useState(false)
//   const [searchTerm, setSearchTerm] = React.useState('')

//   const columns: readonly Column[] = columnsData
//   const rows = rowData

//   let options: any[] = []
//   if (isSortTextField && sortOptionsData) {
//     options = sortOptionsData.map((option) => ({ label: option }))
//   }

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value)
//     setPage(0)
//   }

//   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDense(event.target.checked)
//   }

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value)
//   }

//   const filteredRows = rows.filter((row: any) => {
//     return columns.some((column) => {
//       return row[column.id]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     })
//   })

//   return (
//     <Box>
//       <Paper sx={{ width: '100%', overflow: 'hidden', padding: '0.5em' }}>
//         <Box component="div" sx={{ display: 'flex', gap: '2em', padding: '0.5em 0' }}>
//           {hasSearchInput && (
//             <SearchInput
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder={translate('vendors.labels.search')}
//             />
//           )}

//           {isSortTextField && (
//             <Autocomplete
//               disablePortal
//               id="combo-box-demo"
//               options={options}
//               size="small"
//               sx={{ width: '235px' }}
//               renderInput={(params) => <TextField {...params} label={sortLabel} />}
//             />
//           )}
//         </Box>

//         <TableContainer sx={{ maxHeight: '60vh' }}>
//           <Table stickyHeader aria-label="sticky table" size={dense ? 'small' : 'medium'}>
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     sx={{ minWidth: column.minWidth }}>
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredRows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row: any) => {
//                   return (
//                     <TableRow hover role="checkbox" tabIndex={-1} key={row.vendorNumber}>
//                       {columns.map((column) => {
//                         const value = row[column.id]
//                         return (
//                           <TableCell
//                             key={column.id}
//                             align={column.align}
//                             sx={column.id === 'actions' ? { width: 50, paddingRight: '2em' } : {}}>
//                             {value}
//                           </TableCell>
//                         )
//                       })}
//                     </TableRow>
//                   )
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={filteredRows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <Box sx={{ mt: 2 }}>
//         <FormControlLabel
//           control={<Switch checked={dense} onChange={handleChangeDense} />}
//           label={translate('table.densePadding')}
//         />
//       </Box>
//     </Box>
//   )
// }
