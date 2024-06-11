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
  Checkbox
} from '@mui/material'
import { Controller, UseFormReturn, SubmitHandler } from 'react-hook-form'
import VendorsTable from '@/components/features/admin/VendorsTable'
import FormDialog from '@/components/shared/FormDialog'
import { NewdDeliveryFormData, newDeliverySchema } from '@/schemas/newDelivery'

const markers = ['Масло', 'Гуми', 'Чистачки']

export default function Deliveries() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)

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
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewdDeliveryFormData> = (data) => {
    console.log(data)
    onCloseDialog()
  }

  function CreateNewDeliveryForm({
    control,
    formState: { errors }
  }: UseFormReturn<NewdDeliveryFormData>) {
    return (
      <>
        <Controller
          name="deliveryNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('newDelivery.labels.deliveryNumber')}
              id="deliveryNumber"
              name="deliveryNumber"
              required
              fullWidth
              autoFocus
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
              label={translate('newDelivery.labels.receptionNumber')}
              id="receptionNumber"
              name="receptionNumber"
              required
              fullWidth
              autoFocus
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
              label={translate('newDelivery.labels.cmrNumber')}
              id="cmrNumber"
              name="cmrNumber"
              required
              fullWidth
              autoFocus
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
                {translate('newZone.labels.markers')}
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

      <FormDialog<NewdDeliveryFormData>
        open={openDialog}
        title={translate('newDelivery.title')}
        steps={steps}
        discardText={translate('newDelivery.labels.exit')}
        confirmText={translate('newDelivery.labels.create')}
        onCloseDialog={onCloseDialog}
        // new Schema
        schema={newDeliverySchema}
        onSubmit={handleSubmit}
        // new Form
        renderForm={CreateNewDeliveryForm}
      />
    </>
  )
}
