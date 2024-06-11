import { NewDeliveryStep2FormData } from '@/schemas/newDeliveryStep2'
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// Please npm install @mui/x-date-pickers from the project.

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const vendorName = ['Bosch', 'Valeo']

export default function Step2Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep2FormData>) {
  const { t: translate } = useTranslation()
  return (
    <>
      <Controller
        name="vendorName"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label" required>
              {translate('newDelivery.labels.step2.vendorName')}
            </InputLabel>
            <Select
              {...field}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              required
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => (selected as string[]).join(', ')}>
              {vendorName.map((currentVendorName) => (
                <MenuItem key={currentVendorName} value={currentVendorName}>
                  <Checkbox checked={field.value?.includes(currentVendorName)} />{' '}
                  <ListItemText primary={currentVendorName} />
                </MenuItem>
              ))}
            </Select>
            {errors.vendorName && (
              <FormHelperText>
                {errors.vendorName?.message ? translate(errors.vendorName.message) : ''}
              </FormHelperText>
            )}
          </FormControl>
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
            fullWidth
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
            fullWidth
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
