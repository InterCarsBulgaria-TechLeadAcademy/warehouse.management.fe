import * as yup from 'yup'

export const newDeliverySchema = yup.object({
  deliveryNumber: yup
    .string()
    .required('newDelivery.errors.deliveryNumber.required')
    .matches(/^[0-9]+$/, 'newDelivery.errors.deliveryNumber.typeError')
    .min(1, 'newDelivery.errors.deliveryNumber.min')
    .max(10, 'newDelivery.errors.deliveryNumber.max'),
  receptionNumber: yup
    .string()
    .required('newDelivery.errors.receptionNumber.required')
    .matches(/^[0-9]+$/, 'newDelivery.errors.receptionNumber.typeError')
    .min(1, 'newDelivery.errors.receptionNumber.min')
    .max(10, 'newDelivery.errors.receptionNumber.max'),
  cmrNumber: yup
    .string()
    .required('newDelivery.errors.cmrNumber.required')
    .matches(/^[0-9]+$/, 'newDelivery.errors.cmrNumber.typeError')
    .min(1, 'newDelivery.errors.cmrNumber.min')
    .max(10, 'newDelivery.errors.cmrNumber.max'),
  markers: yup.array().of(yup.string())
})

export interface NewdDeliveryFormData extends yup.InferType<typeof newDeliverySchema> {
  deliveryNumber: string
  receptionNumber: string
  cmrNumber: string
}
