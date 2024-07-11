import { NewVendorFormData } from '@/schemas/newVendorSchema'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { MarkerDto } from '@/services/model'
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

//добавяме interface, който разширява UseFormReturn<NewVendorFormData>
interface NewVendorFormProps extends UseFormReturn<NewVendorFormData> {
  defaultValues?: {
    name?: string
    vendorNumber: string
    markersIds?: any //трябва да е [] | string[], но така гърми ZoneTableActionsMenu и не знам как
  }
}

// export default function NewVendorForm({
//   control,
//   formState: { errors }
// }: UseFormReturn<NewVendorFormData>) {

export default function NewVendorForm({
  control,
  formState: { errors },
  defaultValues = { name: '', vendorNumber: '', markersIds: [] } //set defaultValues when is undefined
}: NewVendorFormProps) {
  const { t: translate } = useTranslation()

  //Правим гет заявка, за да вземем всички маркери
  //TODO: da korigiram, za da vzimam vsichki markers, a ne samo pyrvite 10 kato opravqt back-end-a
  const { data } = useSuspenseQuery({
    queryKey: ['markers'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiMarkerAll()
    }
  })

  // const markers = ['Масло', 'Гуми', 'Чистачки', 'Накладки']

  return (
    <>
      <Controller
        name="vendorName"
        control={control}
        defaultValue={defaultValues.name} //добавяме defaultValue
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newVendor.labels.name')}
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
        control={control}
        defaultValue={defaultValues.vendorNumber} //добавяме defaultValue
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newVendor.labels.vendorNumber')}
            id="vendorNumber"
            name="vendorNumber"
            type="number"
            required
            fullWidth
            autoFocus
            error={!!errors.vendorNumber}
            helperText={errors.vendorNumber?.message ? translate(errors.vendorNumber.message) : ''}
          />
        )}
      />

      {/* <Controller
        name="markers"
        control={control}
        defaultValue={defaultValues.markersIds} //добавяме defaultValue
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-markers-label">
              {translate('newVendor.labels.markers')}
            </InputLabel>
            <Select
              {...field}
              label={translate('newVendor.labels.markers')}
              labelId="demo-multiple-markers-label"
              id="demo-multiple-markers"
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              renderValue={(selected) => (selected as string[]).join(', ')}>
              {markers.map((marker) => (
                <MenuItem key={marker} value={marker}>
                  <ListItemText primary={marker} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      /> */}

      <Controller
        name="markers"
        control={control}
        defaultValue={defaultValues.markersIds} //добавяме defaultValue
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-markers-label">
              {translate('newVendor.labels.markers')}
            </InputLabel>
            <Select
              {...field}
              label={translate('newVendor.labels.markers')}
              labelId="demo-multiple-markers-label"
              id="demo-multiple-markers"
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              //Промяна в renderValue и MenuItem долу, за да може да не се показват id-тата, а имената на маркерите
              renderValue={(selected) => {
                const selectedMarkerNames = selected
                  .map((id) => {
                    const isMarker = data.find((marker) => marker.id === Number(id))
                    if (isMarker) {
                      return isMarker.name
                    }
                  })
                  .join(', ')

                return selectedMarkerNames
              }}>
              {data.map((marker: MarkerDto) => (
                <MenuItem key={marker.id!} value={marker.id!}>
                  <Checkbox checked={field.value?.includes(marker.name!)} />{' '}
                  <ListItemText primary={marker.name!} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  )
}
