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
  const {
    currentStep,
    formsData,
    openDialog,
    onCloseDialog,
    handleBack,
    handleClickOpen,
    handleSubmit
  } = useNewDeliveryContext()
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
        // да пробвам да изнеса methods
        renderForm={(methods) => (
          <NewDeliveryRenderForm currentStep={currentStep} formsData={formsData} {...methods} />
        )}
      />
    </>
  )
}
// Without context
// import SkeletonPage from '@/components/features/SkeletonPage'
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { SubmitHandler } from 'react-hook-form'
// import VendorsTable from '@/components/features/admin/VendorsTable'
// import FormDialog from '@/components/shared/FormDialog'
// import NewDeliveryRenderForm from '@/components/features/forms/NewDeliveryRenderForm'
// import useSchema from '@/hooks/useSchema'
// import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'

// export default function Deliveries() {
//   const { t: translate } = useTranslation()
//   const [openDialog, setOpenDialog] = useState(false)
//   const [currentStep, setCurrentStep] = useState(0)
//   const [formsData, setFormsData] = useState<any>({})
//   const steps = useNewDeliverySteps()
//   const schema = useSchema(currentStep)

//   const handleClickOpen = () => {
//     setOpenDialog(true)
//   }

//   const onCloseDialog = () => {
//     setOpenDialog(false)
//     setCurrentStep(0)
//   }

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1)
//     }
//   }

//   const handleSubmit: SubmitHandler<any> = (data) => {
//     if (currentStep === steps.length - 1) {
//       // Final data
//       console.log('Final submission:', data)
//       setFormsData(data)
//     } else {
//       console.log(data)
//       setFormsData(data)
//       setCurrentStep((prev) => prev + 1)
//     }
//   }

//   return (
//     <>
//       <SkeletonPage
//         header={translate('deliveries.title')}
//         description={translate('deliveries.description')}
//         buttonText={translate('deliveries.labels.newDelivery')}
//         buttonClickHandler={handleClickOpen}
//         //For example. Make Deliveries table
//         table={<VendorsTable />}
//       />

//       <FormDialog<any>
//         open={openDialog}
//         title={translate('newDelivery.title')}
//         steps={steps}
//         activeStep={currentStep}
//         confirmText={translate('newDelivery.labels.forward')}
//         discardText={translate('newDelivery.labels.back')}
//         onCloseDialog={onCloseDialog}
//         handleBack={handleBack}
//         schema={schema}
//         onSubmit={handleSubmit}
//         renderForm={(methods) => (
//           <NewDeliveryRenderForm currentStep={currentStep} formsData={formsData} {...methods} />
//         )}
//       />
//     </>
//   )
// }
