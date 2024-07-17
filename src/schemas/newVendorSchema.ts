import * as yup from 'yup'

export const newVendorSchema = yup.object({
  vendorName: yup
    .string()
    .required('newVendor.errors.name.required')
    .max(50, 'newVendor.errors.name.max'),
  vendorNumber: yup
    .string()
    .typeError('newVendor.errors.vendorNumber.typeError')
    .max(25, 'newVendor.errors.vendorNumber.max'),
  markers: yup.array().of(yup.string()),
})

export interface NewVendorFormData extends yup.InferType<typeof newVendorSchema> {
  vendorName: string
  vendorNumber: string
  markers: string[]
}
