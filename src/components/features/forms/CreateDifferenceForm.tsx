import usePostDifference from '@/hooks/services/differences/usePostDifference'
import useGetDifferenceTypes from '@/hooks/services/differenceType/useGetDifferenceTypes'
import useGetZones from '@/hooks/services/zones/useGetZones'
import { CreateDifferenceFormData, createDifferenceSchema } from '@/schemas/createDifferenceSchema'
import { EntryDto } from '@/services/model'
import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface CreateDifferenceFormProps {
  handleCloseForm: () => void
  entry: EntryDto
}

export default function CreateDifferenceForm({
  handleCloseForm,
  entry
}: CreateDifferenceFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateDifferenceFormData>({
    resolver: yupResolver(createDifferenceSchema),
    defaultValues: {
      internalNumber: '',
      activeNumber: '',
      receptionNumber: '',
      count: 1,
      differenceType: '',
      zone: '',
      comment: ''
    }
  })

  const { t: translate } = useTranslation()
  const zones = useGetZones()
  const differenceTypes = useGetDifferenceTypes()
  const mutationPostDifference = usePostDifference()

  const [count, setCount] = React.useState<string | undefined>('')

  const handleFormSubmit: SubmitHandler<CreateDifferenceFormData> = (data) => {
    mutationPostDifference.mutate({
      internalNumber: data.internalNumber,
      activeNumber: data.activeNumber,
      receptionNumber: data.receptionNumber,
      count: data.count,
      differenceTypeId: Number(data.differenceType),
      zoneId: Number(data.zone),
      comment: data.comment,
      deliveryId: entry.deliveryDetails!.id!
    })
    handleCloseForm()
  }

  const receptionNumberOptions = entry.deliveryDetails!.receptionNumber!.split(' | ')

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2em', alignItems: 'center' }}>
        <Controller
          name="internalNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('zonesContent.table.actions.createDifference.labels.internalNumber')}
              id="internalNumber"
              name="internalNumber"
              required
              error={!!errors.internalNumber}
              helperText={
                errors.internalNumber?.message ? translate(errors.internalNumber.message) : ''
              }
            />
          )}
        />

        <Controller
          name="activeNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('zonesContent.table.actions.createDifference.labels.activeNumber')}
              id="activeNumber"
              name="activeNumber"
              required
              error={!!errors.activeNumber}
              helperText={
                errors.activeNumber?.message ? translate(errors.activeNumber.message) : ''
              }
            />
          )}
        />

        <Controller
          name="receptionNumber"
          control={control}
          render={({ field }) => {
            return (
              <Autocomplete
                {...field}
                options={receptionNumberOptions}
                getOptionLabel={(option) => option || ''}
                value={receptionNumberOptions.find((option) => option === field.value) || ''}
                onChange={(_: any, newValue: string | null) => {
                  field.onChange(newValue || '')
                }}
                inputValue={field.value || ''}
                onInputChange={(_event, newInputValue) => {
                  field.onChange(newInputValue)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={translate(
                      'zonesContent.table.actions.createDifference.labels.receptionNumber'
                    )}
                    error={!!errors.receptionNumber}
                    helperText={
                      errors.receptionNumber?.message
                        ? translate(errors.receptionNumber.message)
                        : ''
                    }
                  />
                )}
              />
            )
          }}
        />

        <Controller
          name="count"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('zonesContent.table.actions.createDifference.labels.count')}
              id="count"
              name="count"
              sx={{ flex: 1 }}
              required
              value={count}
              onChange={(e) => {
                const inputValue = e.target.value
                // Check if entiry value is a number
                if (inputValue === '' || !isNaN(Number(inputValue))) {
                  setCount(inputValue)
                  field.onChange(inputValue)
                }
              }}
              error={!!errors.count}
              helperText={errors.count?.message ? translate(errors.count.message) : ''}
            />
          )}
        />

        <Controller
          name="differenceType"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={differenceTypes}
              getOptionLabel={(option) => option.name || ''}
              value={
                differenceTypes.find(
                  (differenceType) => differenceType.id!.toString() === field.value
                ) || null
              }
              onChange={(_event: any, newValue) => {
                // save id of the selected option
                const newDifferenceTypeId = newValue ? newValue.id!.toString() : null
                field.onChange(newDifferenceTypeId)
              }}
              inputValue={
                // Show name of the selected option in textField
                differenceTypes.find(
                  (differenceType) => differenceType.id!.toString() === field.value
                )?.name || ''
              }
              id="differenceType"
              sx={{ flex: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={translate(
                    'zonesContent.table.actions.createDifference.labels.differenceType'
                  )}
                  error={!!errors.differenceType}
                  helperText={
                    errors.differenceType?.message ? translate(errors.differenceType.message) : ''
                  }
                />
              )}
            />
          )}
        />

        <Controller
          name="zone"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={zones}
              getOptionLabel={(option) => option.name || ''}
              value={zones.find((zone) => zone.id!.toString() === field.value) || null}
              onChange={(_event: any, newValue) => {
                // save id of the selected option
                const newZoneId = newValue ? newValue.id!.toString() : null
                field.onChange(newZoneId)
              }}
              inputValue={
                // Show name of the selected option in textField
                zones.find((zone) => zone.id!.toString() === field.value)?.name || ''
              }
              id="zone"
              sx={{ flex: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={translate('zonesContent.table.actions.createDifference.labels.zone')}
                  error={!!errors.zone}
                  helperText={errors.zone?.message ? translate(errors.zone.message) : ''}
                />
              )}
            />
          )}
        />

        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('zonesContent.table.actions.createDifference.labels.comment')}
              id="comment"
              name="comment"
              multiline
              rows={4}
            />
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleCloseForm}>
            {translate('zonesContent.table.actions.createDifference.labels.discard')}
          </Button>

          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            {translate('zonesContent.table.actions.createDifference.labels.confirm')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
