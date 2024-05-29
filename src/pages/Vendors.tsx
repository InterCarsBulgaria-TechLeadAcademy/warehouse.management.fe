import ActionsMenu from '@/components/features/ActionsMenu'
import SkeletonPage from '@/components/features/SkeletonPage'
import DataTable from '@/components/shared/DataTable'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NewVendor from './NewVendor'

export default function Vendors() {
  const { t: translate } = useTranslation()
  const [openNewVendor, setOpenNewVendor] = useState(false)

  const handleClickOpen = () => {
    console.log('clicked')
    setOpenNewVendor(true)
  }

  const onCloseHandler = () => {
    setOpenNewVendor(false)
  }

  const table = () => {
    return (
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
    )
  }

  return (
    <>
      <SkeletonPage
        header={translate('vendors.title')}
        description={translate('vendors.description')}
        buttonText={translate('vendors.labels.newVendor')}
        buttonClickHandler={handleClickOpen}
        table={table()}
      />

      <NewVendor open={openNewVendor} onCloseHandler={onCloseHandler} />
    </>
  )
}
