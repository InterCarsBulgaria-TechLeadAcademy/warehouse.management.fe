import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import NewDeliveryStep1Form from './NewDeliveryStep1Form'
import NewDeliveryStep2Form from './NewDeliveryStep2Form'
import NewDeliveryStep3Form from './NewDeliveryStep3Form'
import NewDeliveryStep4Form from './NewDeliveryStep4Form'
import { UseFormReturn } from 'react-hook-form'

export default function NewDeliveryRenderForm({ ...methods }: UseFormReturn<any>) {
  const { currentStep } = useNewDeliveryContext()
  switch (currentStep) {
    case 1:
      return <NewDeliveryStep1Form {...methods} />
    case 2:
      return <NewDeliveryStep2Form {...methods} />
    case 3:
      return <NewDeliveryStep3Form {...methods} />
    case 4:
      return <NewDeliveryStep4Form {...methods} />
    //   case 5:
    //   return
    default:
      return null
  }
}
