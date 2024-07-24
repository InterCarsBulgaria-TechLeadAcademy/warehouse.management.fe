import { NewDeliveryStep2FormData } from '@/schemas/newDeliverySchemas'
import { Autocomplete, TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import dayjs from 'dayjs'

const vendorName = ['Bosch', 'Valeo']

export default function NewDeliveryStep2Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep2FormData>) {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()

  return (
    <>
      <Controller
        name="vendorName"
        control={control}
        defaultValue={formsData.vendorName || null}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id="vendorName"
            options={vendorName}
            value={field.value}
            onChange={(_, newValue) => {
              field.onChange(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('deliveries.newDelivery.labels.step2.vendorName')}
                error={!!errors.vendorName}
                helperText={errors.vendorName?.message ? translate(errors.vendorName.message) : ''}
              />
            )}
          />
        )}
      />
      <Controller
        name="vendorId"
        control={control}
        defaultValue={formsData.vendorId || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('deliveries.newDelivery.labels.step2.vendorId')}
            id="vendorId"
            name="vendorId"
            // readOnly
            required
            error={!!errors.vendorId}
            helperText={errors.vendorId?.message ? translate(errors.vendorId.message) : ''}
          />
        )}
      />
      <Controller
        name="truckNumber"
        control={control}
        defaultValue={formsData.truckNumber || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('deliveries.newDelivery.labels.step2.truckNumber')}
            id="truckNumber"
            name="truckNumber"
            required
            error={!!errors.truckNumber}
            helperText={errors.truckNumber?.message ? translate(errors.truckNumber.message) : ''}
          />
        )}
      />
      <Controller
        name="deliveryDate"
        control={control}
        defaultValue={formsData.deliveryDate || dayjs().toDate()}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...field}
              label={translate('deliveries.newDelivery.labels.step2.deliveryDate')}
              value={dayjs(field.value)}
              onChange={(newValue) => {
                field.onChange(newValue?.toDate())
              }}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  required: true,
                  error: !!errors.deliveryDate,
                  helperText: errors.deliveryDate?.message
                    ? translate(errors.deliveryDate.message)
                    : ''
                }
              }}
            />
          </LocalizationProvider>
        )}
      />
    </>
  )
}
