import { NewVendorFormData } from '@/schemas/newVendorSchema'
import { MarkerDto } from '@/services/model'
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useGetMarkers from '@/hooks/services/markers/useGetMarkers'
import { markerIsSelected } from '@/utils/markerIsSelected.ts'
import useGetVendor from '@/hooks/services/vendors/useGetVendor'

interface NewVendorFormProps extends UseFormReturn<NewVendorFormData> {
  vendorId?: number
}

export default function NewVendorForm({
  control,
  formState: { errors },
  vendorId
}: NewVendorFormProps) {
  const { t: translate } = useTranslation()
  const markers = useGetMarkers()
  const vendor = useGetVendor(vendorId)

  return (
    <>
      <Controller
        name="vendorName"
        defaultValue={vendor?.name || ''}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('vendors.newVendor.labels.name')}
            id="vendorName"
            name="vendorName"
            required
            fullWidth
            autoFocus
            error={!!errors.vendorName}
            helperText={errors.vendorName?.message ? translate(errors.vendorName.message) : ''}
          />
        )}
      />
      <Controller
        name="vendorNumber"
        defaultValue={vendor?.systemNumber || ''}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('vendors.newVendor.labels.vendorNumber')}
            id="vendorNumber"
            name="vendorNumber"
            required
            fullWidth
            autoFocus
            error={!!errors.vendorNumber}
            helperText={errors.vendorNumber?.message ? translate(errors.vendorNumber.message) : ''}
          />
        )}
      />

      <Controller
        name="markers"
        defaultValue={vendor ? vendor?.markers?.map((marker) => marker.markerId!.toString()) : []}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-markers-label">
              {translate('vendors.newVendor.labels.markers')}
            </InputLabel>
            <Select
              {...field}
              labelId="demo-multiple-markers-label"
              id="demo-multiple-markers"
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              input={<OutlinedInput label={translate('newVendor.labels.markers')} />}
              renderValue={(selected) => {
                const selectedMarkerNames = selected
                  .map((id) => {
                    const isMarker = markers.find((marker) => marker.id === Number(id))
                    if (isMarker) {
                      return isMarker.name
                    }
                  })
                  .join(', ')

                return selectedMarkerNames
              }}>
              {markers.map((marker: MarkerDto) => (
                <MenuItem key={marker.id} value={marker.id?.toString()}>
                  <Checkbox checked={markerIsSelected(field.value, marker.id!)} />
                  <ListItemText primary={marker.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  )
}
