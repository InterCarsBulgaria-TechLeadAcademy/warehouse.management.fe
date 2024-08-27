import * as yup from 'yup'

export const newRoleSchema = yup.object({
  name: yup
    .string()
    .required('roles.newRole.errors.required')
    .min(5, 'roles.newRole.errors.min')
    .max(50, 'roles.newRole.errors.max'),
  permissionIds: yup.array().of(yup.string())
})

export interface NewRoleFormData extends yup.InferType<typeof newRoleSchema> {
  name: string
  permissionIds: string[]
}
