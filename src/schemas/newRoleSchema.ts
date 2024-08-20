import * as yup from 'yup'

export const newRoleSchema = yup.object({
  name: yup
    .string()
    .required('Името е задължително')
    .min(5, 'Името трябва да е минимум 5 символа')
    .max(50, 'Името трябва да е максимум 50 символа'),
  permissionIds: yup.array().of(yup.string())
})

export interface NewRoleFormData extends yup.InferType<typeof newRoleSchema> {
  name: string
  permissionIds: string[]
}