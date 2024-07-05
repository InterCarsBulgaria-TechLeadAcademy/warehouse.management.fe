import * as yup from 'yup'

const createMoveEntrySchema = (maxQuantity: number) => yup.object({
  quantity: yup
    .number()
    .required('zones.errors.quantity.message')
    .min(1, 'zones.errors.quantity.max')
    .max(maxQuantity, 'zones.errors.quantity.max'),
  zone: yup.string().required('zones.errors.zone.message'),
})

export { createMoveEntrySchema }

export interface MoveEntryFormData extends yup.InferType<ReturnType<typeof createMoveEntrySchema>> {
  quantity: number
  zone: string
}