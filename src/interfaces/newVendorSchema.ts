import * as yup from 'yup'
import { newVendorSchema } from '@/schemas/newVendorSchema'

export interface NewVendorFormData extends yup.InferType<typeof newVendorSchema> {
  vendorName: string
  vendorNumber: string
}
