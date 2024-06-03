import * as yup from 'yup'

export const newZoneSchema = yup.object({
  zoneName: yup
    .string()
    .required('newZone.errors.name.required')
    .max(25, 'newZone.errors.name.max'),
  markers: yup.array().of(yup.string()),
  isFinal: yup.boolean()
})

export interface NewZoneFormData extends yup.InferType<typeof newZoneSchema> {
  zoneName: string
}
