import SkeletonPage from '@/components/features/SkeletonPage'
import FormDialog from '@/components/shared/FormDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  OutlinedInput
} from '@mui/material'
import { Controller, UseFormReturn, SubmitHandler } from 'react-hook-form'
import { NewZoneFormData, newZoneSchema } from '@/schemas/newZoneSchema'
import ZonesTable from '@/components/features/admin/ZonesTable'

const markers = ['Масло', 'Гуми', 'Чистачки']

export default function Zones() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewZoneFormData> = (data) => {
    console.log(data)
    onCloseDialog()
  }

  function CreateZoneForm({ control, formState: { errors } }: UseFormReturn<NewZoneFormData>) {
    return (
      <>
        <Controller
          name="zoneName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('newZone.labels.name')}
              id="zoneName"
              name="zoneName"
              required
              fullWidth
              autoFocus
              error={!!errors.zoneName}
              helperText={errors.zoneName?.message ? translate(errors.zoneName.message) : ''}
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

        <Controller
          name="isFinal"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={translate('newZone.labels.isFinal')}
            />
          )}
        />
      </>
    )
  }

  return (
    <>
      <SkeletonPage
        header={translate('zones.title')}
        description={translate('zones.description')}
        buttonText={translate('zones.labels.newZone')}
        buttonClickHandler={handleClickOpen}
        table={<ZonesTable />}
      />

      <FormDialog<NewZoneFormData>
        open={openDialog}
        title={translate('newZone.title')}
        discardText={translate('newZone.labels.exit')}
        confirmText={translate('newZone.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={newZoneSchema}
        onSubmit={handleSubmit}
        renderForm={CreateZoneForm}
      />
    </>
  )
}
