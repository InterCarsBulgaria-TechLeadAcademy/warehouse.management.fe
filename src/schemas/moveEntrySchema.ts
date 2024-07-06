import * as yup from 'yup'

const createMoveEntrySchema = (maxQuantity: number) => yup.object({
  quantity: yup
    .number()
    .required('zonesContent.moveEntryForm.errors.quantity.message')
    .min(1, 'zonesContent.moveEntryForm.errors.quantity.min')
    .max(maxQuantity, 'zonesContent.moveEntryForm.errors.quantity.max'),
  zone: yup.string().required('zonesContent.moveEntryForm.errors.zone.message'),
})

export { createMoveEntrySchema }

export interface MoveEntryFormData extends yup.InferType<ReturnType<typeof createMoveEntrySchema>> {
  quantity: number
  zone: string
}