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

export const newDeliveryStep2Schema = yup
  .object({
    vendorName: yup.string().required('newDelivery.errors.step2.vendorName.required'),
    vendorId: yup.number().typeError('newDelivery.errors.step2.vendorId.typeError'),
    truckNumber: yup.number().typeError('newDelivery.errors.step2.truckNumber.typeError')

    // deliveryTime: yup
    //   .date()
    //   .typeError('newDelivery.errors.step2.deliveryTime.validDate')
    //   .required('newDelivery.errors.step2.deliveryTime.required')
  })
  .required()

export interface NewDeliveryStep2FormData extends yup.InferType<typeof newDeliveryStep2Schema> {
  vendorName: string
  vendorId: number
  truckNumber: number
  // deliveryTime: Date
}

// import * as yup from 'yup'

// export const newDeliveryStep3Schema = yup
//   .object({
//     goodType: yup.string().required('newDelivery.errors.step3.goodType.required'),
//     goodQuantity: yup
//       .number()
//       .required('newDelivery.errors.step3.goodQuantity.required')
//       .typeError('newDelivery.errors.step3.goodQuantity.typeError')
//       .min(1, 'newDelivery.errors.step3.goodQuantity.min')
//   })
//   .required()

// export interface NewDeliveryStep3FormData extends yup.InferType<typeof newDeliveryStep3Schema> {
//   goodType: string
//   goodQuantity: number
// }

export const newDeliveryStep3Schema = yup
  .object({
    goods: yup.array().of(
      yup.object({
        goodTypeStep3: yup.string().required('newDelivery.errors.step3.goodType.required'),
        goodQuantityStep3: yup
          .number()
          .required('newDelivery.errors.step3.goodQuantity.required')
          .typeError('newDelivery.errors.step3.goodQuantity.typeError')
          .min(1, 'newDelivery.errors.step3.goodQuantity.min')
      })
    )
  })
  .required()

export interface NewDeliveryStep3FormData extends yup.InferType<typeof newDeliveryStep3Schema> {
  goods: {
    // понеже goodType и goodQuantity ги има в Step4, трябва да бъдат уникални
    goodTypeStep3: string
    goodQuantityStep3: number
  }[]
}

export const newDeliveryStep4Schema = yup
  .object({
    goods: yup.array().of(
      yup.object({
        goodTypeStep4: yup.string().required('newDelivery.errors.step4.goodType.required'),
        goodQuantityStep4: yup
          .number()
          .required('newDelivery.errors.step4.goodQuantity.required')
          .typeError('newDelivery.errors.step4.goodQuantity.typeError')
          .min(1, 'newDelivery.errors.step4.goodQuantity.min'),
        zone: yup.string().required('newDelivery.errors.step4.goodType.required')
      })
    )
  })
  .required()

export interface NewDeliveryStep4FormData extends yup.InferType<typeof newDeliveryStep4Schema> {
  goods: {
    // понеже goodType и goodQuantity ги има в Step3, трябва да бъдат уникални
    goodTypeStep4: string
    goodQuantityStep4: number
    zone: string
  }[]
}
