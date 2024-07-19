import * as yup from 'yup'

export const newDifferenceTypeSchema = yup.object({
  differenceTypeName: yup
    .string()
    .required('differenceType.newDifferenceType.errors.required')
    .min(2, 'differenceType.newDifferenceType.errors.min')
    .max(100, 'differenceType.newDifferenceType.errors.max')
})

export interface NewDifferenceTypeFormData extends yup.InferType<typeof newDifferenceTypeSchema> {
  differenceTypeName: string
}
