import * as yup from 'yup'

export const newDeliveryStep1Schema = yup.object({
  deliveryNumber: yup
    .string()
    .required('newDelivery.errors.step1.deliveryNumber.required')
    .matches(/^[0-9]+$/, 'newDelivery.errors.step1.deliveryNumber.typeError')
    .min(1, 'newDelivery.errors.step1.deliveryNumber.min')
    .max(10, 'newDelivery.errors.step1.deliveryNumber.max'),
  receptionNumber: yup
    .string()
    .required('newDelivery.errors.step1.receptionNumber.required')
    .matches(/^[0-9]+$/, 'newDelivery.errors.step1.receptionNumber.typeError')
    .min(1, 'newDelivery.errors.step1.receptionNumber.min')
    .max(10, 'newDelivery.errors.step1.receptionNumber.max'),
  cmrNumber: yup
    .string()
    .required('newDelivery.errors.step1.cmrNumber.required')
    .matches(/^[0-9]+$/, 'newDelivery.errors.step1.cmrNumber.typeError')
    .min(1, 'newDelivery.errors.step1.cmrNumber.min')
    .max(10, 'newDelivery.errors.step1.cmrNumber.max'),
  markers: yup.array().of(yup.string())
})

export interface NewDeliveryStep1FormData extends yup.InferType<typeof newDeliveryStep1Schema> {
  deliveryNumber: string
  receptionNumber: string
  cmrNumber: string
}
