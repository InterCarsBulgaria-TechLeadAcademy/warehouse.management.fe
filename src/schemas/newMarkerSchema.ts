import * as yup from 'yup'

export const newMarkerSchema = yup.object({
  markerName: yup
    .string()
    .required('newMarker.errors.name.required')
    .max(25, 'newMarker.errors.name.max'),
  isFinal: yup.boolean()
})

export interface NewMarkerFormData extends yup.InferType<typeof newMarkerSchema> {
  markerName: string
}