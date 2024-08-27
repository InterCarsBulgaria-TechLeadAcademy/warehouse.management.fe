import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Typography } from '@mui/material'
import { Column } from '@/interfaces/Column.ts'
import ChipsList from '../ChipsList'
import RolesTableActionsMenu from '../actionsMenu/RolesTableActionsMenu'
import useGetRoles from '@/hooks/services/roles/useGetRoles'
import { RoleDto } from '@/services/model'

interface Row {
  id: string
  name: string
  permissions: React.ReactNode
  actions: React.ReactNode
}

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

  const columnsData: Column<Row>[] = [
    { key: 'name', title: translate('roles.table.columns.name') },
    { key: 'permissions', title: translate('roles.table.columns.permissions') },
    {
      key: 'actions',
      title: translate('roles.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(roles: RoleDto[]): Row[] {
    return roles.map((role: RoleDto) => ({
      id: role.id!,
      name: role.name!,
      permissions:
        role.rolePermissions!.length > 0 ? (
          <ChipsList
            items={
              role.rolePermissions?.map((permission: string) => permission!) || ([] as string[])
            }
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
      onRowsPerPageChange={onRowsPerPageChange}>
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={translate('roles.filters.search')}
      />
    </DataTable>
  )
}
