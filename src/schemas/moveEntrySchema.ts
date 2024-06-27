import * as yup from 'yup'

export const moveEntrySchema = yup.object({
  quantity: yup
    .number()
    .required('quantity.errors.name.required')
    .min(1, 'quantity.errors.name.max'),
  zone: yup.string().required('Zone is required'),
  isFinal: yup.boolean().required('Confirm the form')
})

export interface MoveEntryFormData extends yup.InferType<typeof moveEntrySchema> {
  quantity: number
  zone: string
  isFinal: boolean
}