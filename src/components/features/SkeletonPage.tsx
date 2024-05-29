import React from 'react'
import { Box } from '@mui/material'
import HeaderSkeletonPage from './HeaderSkeletonPage'
import DataTable from '../shared/DataTable'
import ActionsMenu from './ActionsMenu'

interface SkeletonPageProps {
  header: string
  description: string
  buttonText?: string
  buttonClickHandler?: React.MouseEventHandler<HTMLButtonElement>
}

export default function SkeletonPage({
  header,
  description,
  buttonText,
  buttonClickHandler
}: SkeletonPageProps) {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        margin: '1em'
      }}>
      <HeaderSkeletonPage
        header={header}
        description={description}
        buttonText={buttonText}
        buttonClickHandler={buttonClickHandler}
      />

      <Box component="article">
        <DataTable
          searchInput={true}
          isSortTextField={true}
          sortLabel={'Роля'}
          sortOptionsData={['Proba1', 'Proba2']}
          columnsData={[
            { id: 'name', label: 'Име' },
            { id: 'vendorNumber', label: 'Доставчик №' },
            { id: 'markers', label: 'Маркери' },
            { id: 'actions', label: 'Действия', minWidth: 50, align: 'right' }
          ]}
          rowData={[
            { name: 'Bosch', vendorNumber: 1, markers: 'Масло', actions: <ActionsMenu /> },
            { name: 'Valeo', vendorNumber: 2, markers: 'Чистачки', actions: <ActionsMenu /> }
          ]}
        />
      </Box>
    </Box>
  )
}
