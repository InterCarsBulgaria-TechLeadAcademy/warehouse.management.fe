import { NewDeliveryStep2FormData } from '@/schemas/newDeliveryStep2'
import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// Please npm install @mui/x-date-pickers from the project.

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const vendorName = ['Bosch', 'Valeo']

export default function NewDeliveryStep2Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep2FormData>) {
  const { t: translate } = useTranslation()

  const [value, setValue] = React.useState<string | null>(null)
  const [inputValue, setInputValue] = React.useState('')

  console.log(errors)

  return (
    <>
      <Controller
        name="vendorName"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue)
              field.onChange(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
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

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <Controller
              name="deliveryTime"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label={translate('newDelivery.labels.step2.deliveryTime')}
                  inputFormat="dd/MM/yyyy" // Define your desired date format here
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      error={!!errors.deliveryTime}
                      helperText={
                        errors.deliveryTime?.message ? translate(errors.deliveryTime.message) : ''
                      }
                    />
                  )}
                />
              )}
            />
          </DemoContainer>
        </LocalizationProvider> */}
    </>
  )
}
