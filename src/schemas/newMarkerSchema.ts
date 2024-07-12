import * as yup from 'yup'

export const newMarkerSchema = yup.object({
  markerName: yup
    .string()
    .required('newMarker.errors.required')
    .min(2, 'newMarker.errors.min')
    .max(100, 'newMarker.errors.max')
})

export interface NewMarkerFormData extends yup.InferType<typeof newMarkerSchema> {
  markerName: string
}
