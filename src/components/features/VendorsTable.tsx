import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

interface Column {
  id: 'name' | 'vendorNumber' | 'markers' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  {
    id: 'name',
    label: 'Име'
    // minWidth: 170,
  },
  {
    id: 'vendorNumber',
    label: 'Доставчик №',
    // minWidth: 100,
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'markers',
    label: 'Маркери'
    // minWidth: 170,
    // align: "right",
  },
  {
    id: 'actions',
    label: 'Действия'
    // minWidth: 500,
    // align: "right",
  }
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

const options = ['Редактирай', 'Изтрий']

function ActionMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

const rows = [
  createData('Bosch', 1, 'Масло', <ActionMenu />),
  createData('Valeo', 2, 'Масло', <ActionMenu />),
  createData('ACDelco', 3, 'Масло', <ActionMenu />),
  createData('Febi Bilstein', 4, 'Масло', <ActionMenu />),
  createData('Delphi', 5, 'Масло', <ActionMenu />),
  createData('Castrol', 6, 'Масло', <ActionMenu />),
  createData('Monroe', 7, 'Масло', <ActionMenu />),
  createData('Continental', 8, 'Масло', <ActionMenu />),
  createData('BREMBO', 9, 'Масло', <ActionMenu />),
  createData('ZF Group', 10, 'Масло', <ActionMenu />),
  createData('Proba', 11, 'Масло', <ActionMenu />),
  createData('Proba', 12, 'Масло', <ActionMenu />),
  createData('Proba', 13, 'Масло', <ActionMenu />),
  createData('Proba', 14, 'Масло', <ActionMenu />),
  createData('Proba', 15, 'Масло', <ActionMenu />)
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
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
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
                      <TableCell key={column.id} align={column.align}>
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
