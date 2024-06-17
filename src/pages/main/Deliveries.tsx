import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'
import VendorsTable from '@/components/features/admin/VendorsTable'
import FormDialog from '@/components/shared/FormDialog'
import NewDeliveryRenderForm from '@/components/features/forms/NewDeliveryRenderForm'
import useSchema from '@/hooks/useSchema'
import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'

export default function Deliveries() {
  const { t: translate } = useTranslation()
  const steps = useNewDeliverySteps()
  const { currentStep, openDialog, onCloseDialog, handleBack, handleClickOpen, handleSubmit } =
    useNewDeliveryContext()
  const schema = useSchema(currentStep)

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

      <FormDialog<any>
        open={openDialog}
        title={translate('newDelivery.title')}
        steps={steps}
        activeStep={currentStep}
        confirmText={translate('newDelivery.labels.forward')}
        discardText={translate('newDelivery.labels.back')}
        onCloseDialog={onCloseDialog}
        handleBack={handleBack}
        schema={schema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewDeliveryRenderForm {...methods} />}
      />
    </>
  )
}
