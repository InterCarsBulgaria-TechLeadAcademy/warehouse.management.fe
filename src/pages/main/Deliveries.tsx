import SkeletonPage from '@/components/features/SkeletonPage'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitHandler } from 'react-hook-form'
import VendorsTable from '@/components/features/admin/VendorsTable'
import FormDialog from '@/components/shared/FormDialog'
import { NewDeliveryStep1FormData, newDeliveryStep1Schema } from '@/schemas/newDeliveryStep1'
import { NewDeliveryStep2FormData, newDeliveryStep2Schema } from '@/schemas/newDeliveryStep2'
import { ObjectSchema } from 'yup''
import NewDeliveryRenderForm from '@/components/features/forms/NewDeliveryRenderForm'

export default function Deliveries() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    translate('newDelivery.steps.deliveryDetails'),
    translate('newDelivery.steps.truckDetails'),
    translate('newDelivery.steps.goodDetails'),
    translate('newDelivery.steps.goodRelocate')
  ]

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

  function schemaForUse(): ObjectSchema<any> | undefined {
    switch (currentStep) {
      case 0:
        return newDeliveryStep1Schema
      case 1:
        return newDeliveryStep2Schema
      // case 2:
      //   return
      //   case 3:
      //   return
      default:
        return undefined
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
        schema={schemaForUse()}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewDeliveryRenderForm currentStep={currentStep} {...methods} />}
      />
    </>
  )
}
