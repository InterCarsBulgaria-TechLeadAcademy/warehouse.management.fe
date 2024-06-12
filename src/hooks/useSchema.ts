import { newDeliveryStep1Schema } from '@/schemas/newDeliveryStep1'
import { newDeliveryStep2Schema } from '@/schemas/newDeliveryStep2'
import { ObjectSchema } from 'yup'

export default function useSchema(currentStep: number): ObjectSchema<any> | undefined {
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
