import * as yup from 'yup'

export const loginSchema = yup
  // TODO: check validation data
  .object({
    username: yup.string().required('login.errors.email.required'),
    password: yup
      .string()
      .required('login.errors.password.required')
      .min(4, 'login.errors.password.min')
      .max(10, 'login.errors.password.max')
      .matches(/[0-9]/, 'login.errors.password.digit')
      .matches(/[!@#$%^&*]/, 'login.errors.password.specialCharacter')
  })
  .required()

export interface LoginFormData extends yup.InferType<typeof loginSchema> {
  username: string
  password: string
}
