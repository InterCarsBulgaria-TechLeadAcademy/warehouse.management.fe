import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { Column } from '@/interfaces/Column.ts'
import ChipsList from '../ChipsList'
import useGetRoles from '@/hooks/services/roles/useGetRoles'
import RolesTableActionsMenu from '../actionsMenu/RolesTableActionsMenu'

interface Row {
  id: number
  name: string
  permissions: React.ReactNode
  actions: React.ReactNode
}

// -------------------------------------------- ↓
// TODO: Watch out for the code later..
interface RoleRightDto {
  rightId?: number
  /** @nullable */
  permissionName?: string | null
}

interface RoleDto {
  id?: number
  /** @nullable */
  name?: string | null
  permissions?: RoleRightDto[] | null
}
// ---------------------------------------------- ↑

export default function RolesTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const roles = useGetRoles()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  const onRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(0)
  }

  const sortOptions = ['regular', 'admin']
  const options = sortOptions.map((option) => ({ label: option }))

  const columnsData: Column<Row>[] = [
    { key: 'name', title: translate('Име') },
    { key: 'permissions', title: translate('Права') },
    {
      key: 'actions',
      title: translate('vendors.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(roles: RoleDto[]): Row[] {
    
    return roles.map((role: RoleDto) => ({
      id: role.id!,
      name: role.name!, // TODO: translate role..
      permissions:
        role.permissions!.length > 0 ? (
          <ChipsList
            items={role.permissions?.map((permission) => permission.permissionName!) || ([] as string[])}
          />
        ) : (
          <Typography>-</Typography>
        ),
      actions: <RolesTableActionsMenu key={role.id} role={role} />
    }))
  }

  const rowData = transformDataToRows(roles || [])

  const filteredRows = rowData.filter((row: Row) => {
    return columnsData.some((column: Column<Row>) => {
      return row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  return (
    <DataTable
      columnsData={columnsData}
      rowData={filteredRows}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    >

      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={translate('vendors.filters.search')}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => (
          <TextField {...params} label={translate('vendors.filters.role')} />
        )}
      />
    </DataTable>
  )
}
