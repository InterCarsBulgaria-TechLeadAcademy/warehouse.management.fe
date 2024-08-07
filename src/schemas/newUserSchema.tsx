import * as yup from 'yup'

export const newUserSchema = yup.object({
  name: yup
    .string()
    .required('Името е задължително')
    .min(5, 'Името трябва да е минимум 5 символа')
    .max(50, 'Името трябва да е максимум 50 символа'),
  email: yup.string().required('login.errors.email.required').email('login.errors.email.invalid'),
  password: yup
    .string()
    .required('login.errors.password.required')
    .min(4, 'login.errors.password.min')
    .max(10, 'login.errors.password.max')
    .matches(/[0-9]/, 'login.errors.password.digit')
    .matches(/[!@#$%^&*]/, 'login.errors.password.specialCharacter'),
  repass: yup.string()
    .required('Потвърдете паролата')
    .oneOf([yup.ref('password')], 'Паролите не съвпадат'),
  role: yup
    .string()
    .required('Ролята е задължителна'),
  rights: yup.array().of(yup.string())
})

export interface NewUserFormData extends yup.InferType<typeof newUserSchema> {
  name: string
  email: string
  password: string
  repass: string
  role: string
  rights: string[]
}