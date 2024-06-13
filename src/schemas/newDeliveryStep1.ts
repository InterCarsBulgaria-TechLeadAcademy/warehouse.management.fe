import * as yup from 'yup'

export const newDeliveryStep1Schema = yup.object({
  deliveryNumber: yup.number().typeError('newDelivery.errors.step3.goodQuantity.typeError'),
  receptionNumber: yup.number().typeError('newDelivery.errors.step1.receptionNumber.typeError'),
  cmrNumber: yup.number().typeError('newDelivery.errors.step1.cmrNumber.typeError'),
  markers: yup.array().of(yup.string())
})

export interface NewDeliveryStep1FormData extends yup.InferType<typeof newDeliveryStep1Schema> {
  deliveryNumber: number
  receptionNumber: number
  cmrNumber: number
}
