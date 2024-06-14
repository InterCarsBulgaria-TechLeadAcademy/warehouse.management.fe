import * as yup from 'yup'

// да оправя преводите
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
