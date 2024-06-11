import { NewDeliveryStep1FormData } from '@/schemas/newDeliveryStep1'
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

const markers = ['Масло', 'Гуми', 'Чистачки']

export default function Step1Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep1FormData>) {
  const { t: translate } = useTranslation()
  return (
    <>
      <Controller
        name="deliveryNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step1.deliveryNumber')}
            id="deliveryNumber"
            name="deliveryNumber"
            required
            fullWidth
            error={!!errors.deliveryNumber}
            helperText={
              errors.deliveryNumber?.message ? translate(errors.deliveryNumber.message) : ''
            }
          />
        )}
      />
      <Controller
        name="receptionNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step1.receptionNumber')}
            id="receptionNumber"
            name="receptionNumber"
            required
            fullWidth
            error={!!errors.receptionNumber}
            helperText={
              errors.receptionNumber?.message ? translate(errors.receptionNumber.message) : ''
            }
          />
        )}
      />

      <Controller
        name="cmrNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step1.cmrNumber')}
            id="cmrNumber"
            name="cmrNumber"
            required
            fullWidth
            error={!!errors.cmrNumber}
            helperText={errors.cmrNumber?.message ? translate(errors.cmrNumber.message) : ''}
          />
        )}
      />

      <Controller
        name="markers"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">
              {translate('newDelivery.labels.step1.markers')}
            </InputLabel>
            <Select
              {...field}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => (selected as string[]).join(', ')}>
              {markers.map((marker) => (
                <MenuItem key={marker} value={marker}>
                  <Checkbox checked={field.value?.includes(marker)} />{' '}
                  <ListItemText primary={marker} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  )
}
