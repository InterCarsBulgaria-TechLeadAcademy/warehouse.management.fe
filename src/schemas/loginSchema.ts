import * as yup from 'yup'

export const loginSchema = yup
  .object({
    email: yup.string().required('errors.email.required').email('errors.email.invalid'),
    password: yup
      .string()
      .required('errors.password.required')
      .min(4, 'errors.password.short')
      .max(10, 'errors.password.long')
      .matches(/[0-9]/, 'errors.password.digit')
      .matches(/[!@#$%^&*]/, 'errors.password.specialCharacter')
  })
  .required()
