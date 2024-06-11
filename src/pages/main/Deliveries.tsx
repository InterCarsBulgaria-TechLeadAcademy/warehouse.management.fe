import SkeletonPage from '@/components/features/SkeletonPage'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  Checkbox,
  FormHelperText
} from '@mui/material'
import { Controller, UseFormReturn, SubmitHandler } from 'react-hook-form'
import VendorsTable from '@/components/features/admin/VendorsTable'
import FormDialog from '@/components/shared/FormDialog'
import { NewDeliveryStep1FormData, newDeliveryStep1Schema } from '@/schemas/newDeliveryStep1'
import { NewDeliveryStep2FormData, newDeliveryStep2Schema } from '@/schemas/newDeliveryStep2'
import { ObjectSchema } from 'yup'

// Please npm install @mui/x-date-pickers from the project.
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const markers = ['Масло', 'Гуми', 'Чистачки']
const vendorName = ['Bosch', 'Valeo']

export default function Deliveries() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    translate('newDelivery.steps.deliveryDetails'),
    translate('newDelivery.steps.truckDetails'),
    translate('newDelivery.steps.goodDetails'),
    translate('newDelivery.steps.goodRelocate')
  ]

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    if (currentStep === 0) {
      setOpenDialog(false)
    } else {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit: SubmitHandler<NewDeliveryStep1FormData | NewDeliveryStep2FormData> = (
    data
  ) => {
    if (currentStep === steps.length - 1) {
      // Тук можете да обработите финалното изпращане на данните
      console.log('Final submission:', data)
    } else {
      console.log(data)
      setCurrentStep((prev) => prev + 1)
    }
  }

  function Step1Form({ control, formState: { errors } }: UseFormReturn<NewDeliveryStep1FormData>) {
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

  function Step2Form({ control, formState: { errors } }: UseFormReturn<NewDeliveryStep2FormData>) {
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

  function renderForm(methods: UseFormReturn<any>) {
    if (currentStep === 0) {
      return <Step1Form {...methods} />
    } else if (currentStep === 1) {
      return <Step2Form {...methods} />
    }
    return null
  }

  function schemaForUse(): ObjectSchema<any> | undefined {
    if (currentStep === 0) {
      return newDeliveryStep1Schema
    } else if (currentStep === 1) {
      return newDeliveryStep2Schema
    }
    return undefined
  }

  return (
    <>
      <SkeletonPage
        header={translate('deliveries.title')}
        description={translate('deliveries.description')}
        buttonText={translate('deliveries.labels.newDelivery')}
        buttonClickHandler={handleClickOpen}
        //For example. Make Deliveries table
        table={<VendorsTable />}
      />

      <FormDialog<any>
        open={openDialog}
        title={translate('newDelivery.title')}
        steps={steps}
        activeStep={currentStep}
        confirmText={translate('newDelivery.labels.forward')}
        discardText={translate('newDelivery.labels.back')}
        onCloseDialog={onCloseDialog}
        schema={schemaForUse()}
        onSubmit={handleSubmit}
        renderForm={renderForm}
      />
    </>
  )
}
