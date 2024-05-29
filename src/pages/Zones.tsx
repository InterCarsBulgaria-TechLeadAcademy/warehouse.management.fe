import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { SkeletonPage } from '../../components/SkeletonPage'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControlLabel } from '@mui/material'
import '@fontsource/roboto/500.css'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object({
    zoneName: yup
      .string()
      .required('Полето за име e задължително')
      .max(25, 'Името трябва да e до 25 символа')
  })
  .required()

interface NewZoneSchema extends yup.InferType<typeof schema> {
  zoneName: string
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const markers = ['Жълт', 'Зелен', 'Син']

export default function Zones() {
  const [open, setOpen] = React.useState(false)
  const [isFinal, setIsFinal] = React.useState<boolean>(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<NewZoneSchema>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<NewZoneSchema> = (data) => {
    const formData = {
      ...data,
      markerName,
      isFinal
    }
    console.log(formData)
    handleClose()
  }

  const [markerName, setMarkerName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof markerName>) => {
    const {
      target: { value }
    } = event
    setMarkerName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const handleChangeIsFinal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFinal(event.target.checked)
  }

  return (
    <>
      <SkeletonPage
        header="Зони"
        description="Управление на зони"
        buttonText="нова зона"
        buttonClickHandler={handleClickOpen}
      />

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
            Създаване на нова зона
          </DialogTitle>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2em',
              padding: '2em',
              '& .MuiTextField-root': { width: '450px' }
            }}>
            <Controller
              name="zoneName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Име"
                  id="zoneName"
                  name="zoneName"
                  required
                  fullWidth
                  autoFocus
                  error={!!errors.zoneName}
                  helperText={errors.zoneName ? errors.zoneName.message : ''}
                />
              )}
            />

            <FormControl>
              <InputLabel id="demo-multiple-checkbox-label">Маркери</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={markerName}
                onChange={handleChange}
                input={<OutlinedInput label="Маркери" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}>
                {markers.map((marker) => (
                  <MenuItem key={marker} value={marker}>
                    <Checkbox checked={markerName.indexOf(marker) > -1} />
                    <ListItemText primary={marker} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={<Checkbox checked={isFinal} onChange={handleChangeIsFinal} />}
              label="isFinal"
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1em'
              }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={Object.keys(errors).length > 0}>
                Създай
              </Button>

              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClose}>
                Изход
              </Button>
            </Box>
          </Box>
        </Dialog>
      </React.Fragment>
    </>
  )
}
