import SkeletonPage from '@/components/features/SkeletonPage'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitHandler } from 'react-hook-form'
import VendorsTable from '@/components/features/admin/VendorsTable'
import FormDialog from '@/components/shared/FormDialog'
import { NewDeliveryStep1FormData } from '@/schemas/newDeliveryStep1'
import { NewDeliveryStep2FormData } from '@/schemas/newDeliveryStep2'
import NewDeliveryRenderForm from '@/components/features/forms/NewDeliveryRenderForm'
import useSchema from '@/hooks/useSchema'
import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'

export default function Deliveries() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const steps = useNewDeliverySteps()
  const schema = useSchema(currentStep)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    if (currentStep === 0) {
      setOpenDialog(false)
    } else {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit: SubmitHandler<NewDeliveryStep1FormData | NewDeliveryStep2FormData> = (
    data
  ) => {
    if (currentStep === steps.length - 1) {
      // Final data
      console.log('Final submission:', data)
    } else {
      console.log(data)
      setCurrentStep((prev) => prev + 1)
    }
  }

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
        schema={schema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewDeliveryRenderForm currentStep={currentStep} {...methods} />}
      />
    </>
  )
}
