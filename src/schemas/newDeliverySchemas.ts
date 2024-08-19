import * as yup from 'yup'

export const newDeliveryStep1Schema = yup.object({
  systemNumber: yup
    .array()
    .of(yup.string())
    .min(1, 'deliveries.newDelivery.errors.step1.systemNumber.min'),
  receptionNumber: yup
    .array()
    .of(yup.string())
    .min(1, 'deliveries.newDelivery.errors.step1.receptionNumber.min'),
  cmr: yup.string().required('deliveries.newDelivery.errors.step1.cmrNumber.required'),
  markers: yup.array().of(yup.string())
})

export interface NewDeliveryStep1FormData extends yup.InferType<typeof newDeliveryStep1Schema> {
  systemNumber: string[]
  receptionNumber: string[]
  cmr: string
}

export const newDeliveryStep2Schema = yup
  .object({
    vendorName: yup.string().required('deliveries.newDelivery.errors.step2.vendorName.required'),
    vendorId: yup.string().required('deliveries.newDelivery.errors.step2.vendorId.required'),
    vendorSystemNumber: yup
      .string()
      .required('deliveries.newDelivery.errors.step2.vendorId.required'),
    truckNumber: yup.string().required('deliveries.newDelivery.errors.step2.truckNumber.required'),
    deliveryTime: yup
      .date()
      .required('deliveries.newDelivery.errors.step2.deliveryTime.required')
      .typeError('deliveries.newDelivery.errors.step2.deliveryTime.validDate')
  })
  .required()

export interface NewDeliveryStep2FormData extends yup.InferType<typeof newDeliveryStep2Schema> {
  vendorName: string
  vendorId: string
  vendorSystemNumber: string
  truckNumber: string
  deliveryTime: Date
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
