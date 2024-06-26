import * as yup from 'yup'

export const moveEntrySchema = yup.object({
  quantity: yup
    .number()
    .required('quantity.errors.name.required')
    .min(1, 'quantity.errors.name.max'),
  zone: yup.string()
})

export interface MoveEntryFormData extends yup.InferType<typeof moveEntrySchema> {
  quantity: number
}