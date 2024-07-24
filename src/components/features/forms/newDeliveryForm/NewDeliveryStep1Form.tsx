import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import { NewDeliveryStep1FormData } from '@/schemas/newDeliverySchemas'
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

export default function NewDeliveryStep1Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep1FormData>) {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()
  return (
    <>
      <Controller
        name="deliveryNumber"
        control={control}
        defaultValue={formsData.deliveryNumber || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('deliveries.newDelivery.labels.step1.deliveryNumber')}
            id="deliveryNumber"
            name="deliveryNumber"
            required
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
        defaultValue={formsData.receptionNumber || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('deliveries.newDelivery.labels.step1.receptionNumber')}
            id="receptionNumber"
            name="receptionNumber"
            required
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
        defaultValue={formsData.cmrNumber || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('deliveries.newDelivery.labels.step1.cmrNumber')}
            id="cmrNumber"
            name="cmrNumber"
            required
            error={!!errors.cmrNumber}
            helperText={errors.cmrNumber?.message ? translate(errors.cmrNumber.message) : ''}
          />
        )}
      />

      <Controller
        name="markers"
        control={control}
        defaultValue={formsData.markers || []}
        render={({ field }) => (
          <FormControl>
            <InputLabel id="markers-label">
              {translate('deliveries.newDelivery.labels.step1.markers')}
            </InputLabel>
            <Select
              {...field}
              labelId="markers-label"
              id="markers"
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              input={
                <OutlinedInput label={translate('deliveries.newDelivery.labels.step1.markers')} />
              }
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
