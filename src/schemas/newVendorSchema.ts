import * as yup from 'yup'

export const newVendorSchema = yup.object({
  vendorName: yup
    .string()
    .required('newVendor.errors.name.required')
    .max(50, 'newVendor.errors.name.max'),
  vendorNumber: yup
    .string()
    .required('newVendor.errors.vendorNumber.required')
    .max(25, 'newVendor.errors.vendorNumber.max'),
  isFinal: yup.boolean()
})

export interface NewVendorFormData extends yup.InferType<typeof newVendorSchema> {
  vendorName: string
  vendorNumber: string
}
