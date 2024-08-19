import * as yup from 'yup'

const createMoveEntrySchema = (maxQuantity: number) =>
  yup.object({
    quantity: yup
      .number()
      .required('zonesContent.table.actions.moveEntryForm.errors.quantity.message')
      .min(1, 'zonesContent.table.actions.moveEntryForm.errors.quantity.min')
      .max(maxQuantity, 'zonesContent.table.actions.moveEntryForm.errors.quantity.max'),
    zone: yup.string().required('zonesContent.table.actions.moveEntryForm.errors.zone.message')
  })

export { createMoveEntrySchema }

export interface MoveEntryFormData extends yup.InferType<ReturnType<typeof createMoveEntrySchema>> {
  quantity: number
  zone: string
}
