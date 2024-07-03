import {
  newDeliveryStep1Schema,
  newDeliveryStep2Schema,
  newDeliveryStep3Schema,
  newDeliveryStep4Schema
} from '@/schemas/newDeliverySchemas'

import { ObjectSchema } from 'yup'

export default function useCreateDeliverySchemasStepper(
  currentStep: number
): ObjectSchema<any> | undefined {
  switch (currentStep) {
    case 1:
      return newDeliveryStep1Schema
    case 2:
      return newDeliveryStep2Schema
    case 3:
      return newDeliveryStep3Schema
    case 4:
      return newDeliveryStep4Schema
    default:
      return undefined
  }
}
