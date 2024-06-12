import { UseFormReturn } from 'react-hook-form'
import NewDeliveryStep1Form from './NewDeliveryStep1Form'
import NewDeliveryStep2Form from './NewDeliveryStep2Form'
import NewDeliveryStep3Form from './NewDeliveryStep3Form'

interface NewDeliveryRenderFormProps extends UseFormReturn<any> {
  currentStep: number
}

export default function NewDeliveryRenderForm({
  currentStep,
  ...methods
}: NewDeliveryRenderFormProps) {
  switch (currentStep) {
    case 0:
      return <NewDeliveryStep1Form {...methods} />
    case 1:
      return <NewDeliveryStep2Form {...methods} />
    case 2:
      return <NewDeliveryStep3Form {...methods} />
    //   case 3:
    //   return
    default:
      return null
  }
}
