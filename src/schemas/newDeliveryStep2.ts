import * as yup from 'yup'

export const newDeliveryStep2Schema = yup
  .object({
    vendorName: yup
      .array()
      .of(yup.string())
      .required('newDelivery.errors.step2.vendorName.required'),
    vendorId: yup.number().typeError('newDelivery.errors.step2.vendorId.typeError'),
    truckNumber: yup.number().typeError('newDelivery.errors.step2.truckNumber.typeError')

    // deliveryTime: yup
    //   .date()
    //   .typeError('newDelivery.errors.step2.deliveryTime.validDate')
    //   .required('newDelivery.errors.step2.deliveryTime.required')
  })
  .required()

export interface NewDeliveryStep2FormData extends yup.InferType<typeof newDeliveryStep2Schema> {
  vendorName: string[]
  vendorId: number
  truckNumber: number
  deliveryTime: Date
}
