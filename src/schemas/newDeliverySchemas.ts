import * as yup from 'yup'

export const newDeliveryStep1Schema = yup.object({
  deliveryNumber: yup
    .string()
    .required('deliveries.newDelivery.errors.step1.deliveryNumber.required'),
  receptionNumber: yup
    .string()
    .required('deliveries.newDelivery.errors.step1.receptionNumber.required'),
  cmrNumber: yup.string().required('deliveries.newDelivery.errors.step1.cmrNumber.required'),
  markers: yup.array().of(yup.string())
})

export interface NewDeliveryStep1FormData extends yup.InferType<typeof newDeliveryStep1Schema> {
  deliveryNumber: string
  receptionNumber: string
  cmrNumber: string
}

export const newDeliveryStep2Schema = yup
  .object({
    vendorName: yup.string().required('deliveries.newDelivery.errors.step2.vendorName.required'),
    vendorId: yup.string().required('deliveries.newDelivery.errors.step2.vendorId.required'),
    truckNumber: yup.string().required('deliveries.newDelivery.errors.step2.truckNumber.required'),
    deliveryDate: yup
      .date()
      .required('deliveries.newDelivery.errors.step2.deliveryDate.required')
      .typeError('deliveries.newDelivery.errors.step2.deliveryDate.validDate')
  })
  .required()

export interface NewDeliveryStep2FormData extends yup.InferType<typeof newDeliveryStep2Schema> {
  vendorName: string
  vendorId: string
  truckNumber: string
  deliveryDate: Date
}

export const newDeliveryStep3Schema = yup
  .object({
    goods: yup.array().of(
      yup.object({
        goodTypeStep3: yup
          .string()
          .required('deliveries.newDelivery.errors.step3.goodType.required'),
        goodQuantityStep3: yup
          .number()
          .required('deliveries.newDelivery.errors.step3.goodQuantity.required')
          .typeError('deliveries.newDelivery.errors.step3.goodQuantity.typeError')
          .min(1, 'deliveries.newDelivery.errors.step3.goodQuantity.min')
      })
    )
  })
  .required()

export interface NewDeliveryStep3FormData extends yup.InferType<typeof newDeliveryStep3Schema> {
  goods: {
    //Because goodType and goodQuantity are in Step4, they must be unique
    goodTypeStep3: string
    goodQuantityStep3: number
  }[]
}

export const newDeliveryStep4Schema = yup
  .object({
    goodsInZones: yup.array().of(
      yup.object({
        goodTypeStep4: yup
          .string()
          .required('deliveries.newDelivery.errors.step4.goodType.required'),
        goodQuantityStep4: yup
          .number()
          .required('deliveries.newDelivery.errors.step4.goodQuantity.required')
          .typeError('deliveries.newDelivery.errors.step4.goodQuantity.typeError')
          .min(1, 'deliveries.newDelivery.errors.step4.goodQuantity.min'),
        zone: yup.string().required('deliveries.newDelivery.errors.step4.goodType.required')
      })
    )
  })
  .required()

export interface NewDeliveryStep4FormData extends yup.InferType<typeof newDeliveryStep4Schema> {
  goodsInZones: {
    //because goodType and goodQuantity are in Step3, they must be unique
    goodTypeStep4: string
    goodQuantityStep4: number
    zone: string
  }[]
}
