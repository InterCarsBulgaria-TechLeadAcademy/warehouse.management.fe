import * as yup from 'yup'

export const createDifferenceSchema = yup.object({
  internalNumber: yup
    .string()
    .required('zonesContent.table.actions.createDifference.errors.internalNumber.required'),
  activeNumber: yup
    .string()
    .required('zonesContent.table.actions.createDifference.errors.activeNumber.required'),
  receptionNumber: yup
    .string()
    .required('zonesContent.table.actions.createDifference.errors.receptionNumber.required'),
  count: yup
    .number()
    //не работи, а излиза някакво друго съобщение
    .required('zonesContent.table.actions.createDifference.errors.count.required')
    .min(1, 'zonesContent.table.actions.createDifference.errors.count.min'),
  differenceType: yup
    .string()
    .required('zonesContent.table.actions.createDifference.errors.differenceType.required'),
  zone: yup.string().required('zonesContent.table.actions.createDifference.errors.zone.required'),
  comment: yup.string()
})

export interface CreateDifferenceFormData extends yup.InferType<typeof createDifferenceSchema> {
  internalNumber: string
  receptionNumber: string
  count: number
  differenceType: string
  zone: string
}
