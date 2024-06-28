import * as yup from 'yup'

export const moveEntrySchema = yup.object({
  quantity: yup
    .number()
    .required('zones.errors.quantity.message')
    .min(1, 'zones.errors.quantity.max'),
  zone: yup.string().required('zones.errors.zone.message'),
})

export interface MoveEntryFormData extends yup.InferType<typeof moveEntrySchema> {
  quantity: number
}