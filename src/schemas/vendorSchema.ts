import * as yup from 'yup'

export const vendorSchema = yup
  .object({
    vendorName: yup
      .string()
      .required('Полето за име e задължително')
      .max(50, 'Името трябва да e до 50 символа'),
    vendorNumber: yup
      .string()
      .required('Полето за доставчик № e задължително')
      .max(25, 'Доставчик № трябва да e до 25 символа')
  })
  .required()

export type VendorFormData = yup.InferType<typeof vendorSchema>
