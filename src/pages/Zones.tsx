import SkeletonPage from '@/components/features/SkeletonPage'
import FormDialog from '@/components/shared/FormDialog'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  ListItemText,
  OutlinedInput
} from '@mui/material'
import { Controller, UseFormReturn, SubmitHandler } from 'react-hook-form'
import ZonesTable from '@/components/features/ZonesTable'
import { NewZoneFormData, newZoneSchema } from '@/schemas/newZoneSchema'

const markers = ['Масло', 'Гуми', 'Чистачки']

export default function Zones() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [isFinal, setIsFinal] = useState(false)
  const [markerName, setMarkerName] = React.useState<string[]>([])

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewZoneFormData> = (data) => {
    const formData = {
      ...data,
      markerName,
      isFinal
    }
    console.log(formData)
    onCloseDialog()
  }

  const handleChange = (event: SelectChangeEvent<typeof markerName>) => {
    const {
      target: { value }
    } = event
    setMarkerName(typeof value === 'string' ? value.split(',') : value)
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
        <FormControl>
          <InputLabel id="demo-multiple-checkbox-label">
            {translate('newZone.labels.markers')}
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={markerName}
            onChange={handleChange}
            input={<OutlinedInput label={translate('newZone.labels.markers')} />}
            renderValue={(selected) => selected.join(', ')}>
            {markers.map((marker) => (
              <MenuItem key={marker} value={marker}>
                <Checkbox checked={markerName.indexOf(marker) > -1} />
                <ListItemText primary={marker} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={isFinal} onChange={() => setIsFinal(!isFinal)} />}
          label={translate('newZone.labels.isFinal')}
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
