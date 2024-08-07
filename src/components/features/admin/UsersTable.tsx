import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { Column } from '@/interfaces/Column.ts'
import ChipsList from '../ChipsList'
import useGetUsers from '@/hooks/services/vendors/useGetUsers'
import UsersTableActionsMenu from '../actionsMenu/UsersTableActionsMenu'

interface Row {
  id: number
  name: string
  email: string
  role: string
  rights: React.ReactNode
  dateCreated: string
  actions: React.ReactNode
}

interface UserRightDto {
  rightId?: number
  /** @nullable */
  rightName?: string | null
}

interface UserDto {
  id?: number
  /** @nullable */
  name?: string | null
  /** @nullable */
  email?: string | null
  /** @nullable */
  role?: string | null
  /** @nullable */
  rights?: UserRightDto[] | null
  dateCreated?: string | null
}

export default function UsersTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const users = useGetUsers()

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
    { key: 'email', title: translate('Емайл') },
    { key: 'role', title: translate('Роля') },
    { key: 'rights', title: translate('Права') },
    { key: 'dateCreated', title: translate('Създаден на') },
    {
      key: 'actions',
      title: translate('vendors.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(users: UserDto[]): Row[] {
    return users.map((user: UserDto) => ({
      id: user.id!,
      name: user.name!,
      email: user.email!,
      role: user.role!,
      rights:
        user.rights!.length > 0 ? (
          <ChipsList
            items={user.rights?.map((right) => right.rightName!) || ([] as string[])}
          />
        ) : (
          <Typography>-</Typography>
        ),
      dateCreated: user.dateCreated!,
      actions: <UsersTableActionsMenu key={user.id} user={user} />
    }))
  }

  const rowData = transformDataToRows(users || [])

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
