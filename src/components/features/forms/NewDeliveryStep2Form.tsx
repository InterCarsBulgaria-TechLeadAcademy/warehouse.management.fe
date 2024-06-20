import { NewDeliveryStep2FormData } from '@/schemas/newDeliverySchemas'
import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'

const vendorName = ['Bosch', 'Valeo']

export default function NewDeliveryStep2Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep2FormData>) {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()
  const [value, setValue] = React.useState<string | null>(formsData.vendorName)
  const [inputValue, setInputValue] = React.useState('')
  const [vendorIdValue, setVendorIdValue] = React.useState<string | undefined>(formsData.vendorId)

  return (
    <>
      <Controller
        name="vendorName"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={value}
            onChange={(_event: any, newValue: string | null) => {
              setValue(newValue)
              field.onChange(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(_event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            id="controllable-states-demo"
            options={vendorName}
            sx={{ flex: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('newDelivery.labels.step2.vendorName')}
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
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step2.vendorId')}
            id="vendorId"
            name="vendorId"
            // readOnly
            required
            value={vendorIdValue}
            onChange={(e) => {
              const inputValue = e.target.value
              // Check if entiry value is a number
              if (inputValue === '' || !isNaN(Number(inputValue))) {
                setVendorIdValue(inputValue)
                field.onChange(inputValue)
              }
            }}
            error={!!errors.vendorId}
            helperText={errors.vendorId?.message ? translate(errors.vendorId.message) : ''}
          />
        )}
      />

      <Controller
        name="truckNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step2.truckNumber')}
            id="truckNumber"
            name="truckNumber"
            required
            error={!!errors.truckNumber}
            helperText={errors.truckNumber?.message ? translate(errors.truckNumber.message) : ''}
          />
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="deliveryDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label={translate('newDelivery.labels.step2.deliveryDate')}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true,
                  error: !!errors.deliveryDate,
                  helperText: errors.deliveryDate?.message
                    ? translate(errors.deliveryDate.message)
                    : ''
                }
              }}
            />
          )}
        />
      </LocalizationProvider>
    </>
  )
}
