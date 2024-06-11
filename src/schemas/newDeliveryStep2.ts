import * as yup from 'yup'

export const newDeliveryStep2Schema = yup
  .object({
    vendorName: yup
      .array()
      .of(yup.string())
      .required('newDelivery.errors.step2.vendorName.required'),
    vendorId: yup
      .string()
      .required('newDelivery.errors.step2.vendorId.required')
      .matches(/^[0-9]+$/, 'newDelivery.errors.step2.vendorId.typeError')
      .min(1, 'newDelivery.errors.step1.vendorId.min'),
    truckNumber: yup
      .string()
      .required('newDelivery.errors.step2.truckNumber.required')
      .matches(/^[0-9]+$/, 'newDelivery.errors.step2.truckNumber.typeError')
      .min(1, 'newDelivery.errors.step1.truckNumber.min')

    // deliveryTime: yup
    //   .date()
    //   .typeError('newDelivery.errors.step2.deliveryTime.validDate')
    //   .required('newDelivery.errors.step2.deliveryTime.required')
  })
  .required()

export interface NewDeliveryStep2FormData extends yup.InferType<typeof newDeliveryStep2Schema> {
  vendorName: string[]
  vendorId: string
  truckNumber: string
  deliveryTime: Date
}
