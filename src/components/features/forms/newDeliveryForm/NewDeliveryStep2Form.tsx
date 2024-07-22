import { NewDeliveryStep2FormData } from '@/schemas/newDeliverySchemas'
import { Autocomplete, TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import dayjs from 'dayjs'
import React from 'react'
import { VendorDto } from '@/services/model'
import useGetVendors from '@/hooks/services/vendors/useGetVendors'

export default function NewDeliveryStep2Form({
  control,
  setValue, //add setValue for dinamic control on values
  formState: { errors }
}: UseFormReturn<NewDeliveryStep2FormData>) {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()
  // TODO: delete useGetVendors when merged Hristo Yotov vendor branch
  const vendors: VendorDto[] = useGetVendors()
  const vendorsNames = vendors.map((vendor: VendorDto) => vendor.name!)

  const [isVisibleVendorId, setIsVisibleVendorId] = React.useState(false)

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
            options={vendorsNames}
            value={field.value}
            onChange={(_, newValue) => {
              if (newValue) {
                setIsVisibleVendorId(true)
                const selectedVendor = vendors.find(
                  (vendor: VendorDto) => vendor.name! === newValue
                )
                if (selectedVendor) {
                  setValue('vendorId', selectedVendor.id!.toString())
                } else {
                  setValue('vendorId', '')
                }
              } else {
                setIsVisibleVendorId(false)
                setValue('vendorId', '')
              }
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

      {(isVisibleVendorId || formsData.vendorId) && (
        <Controller
          name="vendorId"
          control={control}
          defaultValue={formsData.vendorId || ''}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-read-only-input"
              label={translate('deliveries.newDelivery.labels.step2.vendorId')}
              value={field.value}
              InputProps={{
                readOnly: true
              }}
              error={!!errors.vendorId}
              helperText={errors.vendorId?.message ? translate(errors.vendorId.message) : ''}
            />
          )}
        />
      )}

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
        name="deliveryTime"
        control={control}
        defaultValue={formsData.deliveryTime || dayjs().toDate()}
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
                  error: !!errors.deliveryTime,
                  helperText: errors.deliveryTime?.message
                    ? translate(errors.deliveryTime.message)
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
