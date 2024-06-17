import {
  newDeliveryStep1Schema,
  newDeliveryStep2Schema,
  newDeliveryStep3Schema,
  newDeliveryStep4Schema
} from '@/schemas/newDeliverySchemas'

import { ObjectSchema } from 'yup'

export default function useSchema(currentStep: number): ObjectSchema<any> | undefined {
  switch (currentStep) {
    case 0:
      return newDeliveryStep1Schema
    case 1:
      return newDeliveryStep2Schema
    case 2:
      return newDeliveryStep3Schema
    case 3:
      return newDeliveryStep4Schema
    default:
      return undefined
  }
}
