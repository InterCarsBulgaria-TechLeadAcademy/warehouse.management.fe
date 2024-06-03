import { loginSchema } from '@/schemas/loginSchema'
import * as yup from 'yup'

export interface LoginFormData extends yup.InferType<typeof loginSchema> {
  email: string
  password: string
}
