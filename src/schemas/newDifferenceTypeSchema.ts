import * as yup from 'yup'

export const newDifferenceTypeSchema = yup.object({
  differenceTypeName: yup
    .string()
    .required('newDifferenceType.errors.required')
    .min(2, 'newDifferenceType.errors.min')
    .max(100, 'newDifferenceType.errors.max')
})

export interface NewDifferenceTypeFormData extends yup.InferType<typeof newDifferenceTypeSchema> {
  differenceTypeName: string
}
