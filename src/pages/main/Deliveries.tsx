import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'
import VendorsTable from '@/components/features/admin/VendorsTable'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import NewDeliveryFormDialog from '@/components/features/forms/newDeliveryForm/NewDeliveryFormDialog'

export default function Deliveries() {
  const { t: translate } = useTranslation()
  const { handleClickOpen } = useNewDeliveryContext()

  return (
    <>
      <SkeletonPage
        header={translate('deliveries.title')}
        description={translate('deliveries.description')}
        buttonText={translate('deliveries.labels.newDelivery')}
        buttonClickHandler={handleClickOpen}
        //For example. Make Deliveries table
        table={<VendorsTable />}
      />

      <NewDeliveryFormDialog />
    </>
  )
}
