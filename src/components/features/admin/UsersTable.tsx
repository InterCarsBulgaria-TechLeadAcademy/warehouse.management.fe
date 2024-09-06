import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Autocomplete, TextField } from '@mui/material'
import { Column } from '@/interfaces/Column.ts'
import useGetUsers from '@/hooks/services/users/useGetUsers'
import UsersTableActionsMenu from '../actionsMenu/UsersTableActionsMenu'
import useGetRoles from '@/hooks/services/roles/useGetRoles'
import { UserAllDto } from '@/services/model'

interface Row {
  id: string
  name: string
  email: string
  role: string
  dateCreated: string
  actions: React.ReactNode
}

export default function UsersTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedRole, setSelectedRole] = React.useState<{
    label: string | null | undefined
  } | null>(null)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const users = useGetUsers()
  const roles = useGetRoles()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  const handleRoleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: { label: string | null | undefined } | null
  ) => {
    console.log(value)

    setSelectedRole(value)
  }

  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  const onRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(0)
  }

  const sortOptions = roles.map((role) => role.name)
  const options = sortOptions.map((option) => ({ label: option }))

  const columnsData: Column<Row>[] = [
    { key: 'name', title: translate('Име') },
    { key: 'email', title: translate('Емайл') },
    { key: 'role', title: translate('Роля') },
    { key: 'dateCreated', title: translate('Създаден на') },
    {
      key: 'actions',
      title: translate('vendors.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(users: UserAllDto[]): Row[] {
    return users.map((user: UserAllDto) => ({
      id: user.id!,
      name: user.userName!,
      email: user.email!,
      role: user.role!,
      dateCreated: user.createdAt!,
      actions: <UsersTableActionsMenu key={user.id} user={user} />
    }))
  }

  const rowData = Array.isArray(users) ? transformDataToRows(users) : []

  const filteredRows = rowData.filter((row: Row) => {
    const matchesSearchTerm = columnsData.some((column: Column<Row>) => {
      return row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })

    const matchesSelectedRole = selectedRole ? row.role === selectedRole.label : true
    return matchesSearchTerm && matchesSelectedRole
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
        placeholder={translate('vendors.filters.search')}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        value={selectedRole}
        onChange={handleRoleChange}
        isOptionEqualToValue={(option, value) => option.label === value?.label}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => (
          <TextField {...params} label={translate('vendors.filters.role')} />
        )}
      />
    </DataTable>
  )
}
