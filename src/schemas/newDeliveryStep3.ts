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

import * as yup from 'yup'

export const newDeliveryStep3Schema = yup.object({
  goods: yup.array().of(
    yup.object({
      goodType: yup.string().required('newDelivery.errors.step3.goodType.required'),
      goodQuantity: yup
        .number()
        .required('newDelivery.errors.step3.goodQuantity.required')
        .typeError('newDelivery.errors.step3.goodQuantity.typeError')
        .min(1, 'newDelivery.errors.step3.goodQuantity.min')
    })
  )
})

export interface NewDeliveryStep3FormData {
  goods: {
    goodType: string
    goodQuantity: number
  }[]
}
