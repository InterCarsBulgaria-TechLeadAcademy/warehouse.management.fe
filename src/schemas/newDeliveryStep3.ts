import * as yup from 'yup'

export const newDeliveryStep3Schema = yup
  .object({
    goodType: yup.array().of(yup.string()).required('newDelivery.errors.step3.goodType.required'),
    goodQuantity: yup
      .number()
      .typeError('newDelivery.errors.step3.goodQuantity.typeError')
      .min(1, 'newDelivery.errors.step3.goodQuantity.min')
  })
  .required()

export interface NewDeliveryStep3FormData extends yup.InferType<typeof newDeliveryStep3Schema> {
  goodType: string[]
  goodQuantity: number
}
