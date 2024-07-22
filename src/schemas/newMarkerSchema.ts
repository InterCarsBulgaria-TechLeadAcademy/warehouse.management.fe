import * as yup from 'yup'

export const newMarkerSchema = yup.object({
  markerName: yup
    .string()
    .required('markers.newMarker.errors.required')
    .min(2, 'markers.newMarker.errors.min')
    .max(100, 'markers.newMarker.errors.max')
})

export interface NewMarkerFormData extends yup.InferType<typeof newMarkerSchema> {
  markerName: string
}
