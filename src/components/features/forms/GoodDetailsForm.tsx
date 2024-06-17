import { Box } from '@mui/material'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import React from 'react'
import { NewDeliveryStep3FormData } from '@/schemas/newDeliverySchemas'

interface GoodDetailsFormProps {
  control: Control<NewDeliveryStep3FormData, any>
  errors: FieldErrors<NewDeliveryStep3FormData>
  goodType: string[]
  onDeleteHandler: () => void
  index: number
  formsCount: number
  onGoodTypeChange: (value: string | null) => void //Add a function for update selected goodType
}

export default function GoodDetailsForm({
  control,
  errors,
  goodType,
  onDeleteHandler,
  index,
  formsCount,
  onGoodTypeChange
}: GoodDetailsFormProps) {
  const { t: translate } = useTranslation()

  const [value, setValue] = React.useState<string | null>(null)
  const [inputValue, setInputValue] = React.useState('')

  return (
    <Box sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
      <Controller
        name={`goods.${index}.goodTypeStep3`} //Use the index for unique a name field
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={value}
            onChange={(_event: any, newValue: string | null) => {
              setValue(newValue)
              field.onChange(newValue)
              onGoodTypeChange(newValue) //Updating the selected goodType
            }}
            inputValue={inputValue}
            onInputChange={(_event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            id={`GoodDetailsForm.controllable-states-demo${index}`} //Unique id for Autocomplete
            options={goodType}
            sx={{ flex: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('newDelivery.labels.step3.goodType')}
                error={!!errors?.goods?.[index]?.goodTypeStep3}
                helperText={
                  errors?.goods?.[index]?.goodTypeStep3?.message
                    ? translate(errors?.goods[index]?.goodTypeStep3?.message || '')
                    : ''
                }
              />
            )}
          />
        )}
      />
      <Controller
        name={`goods.${index}.goodQuantityStep3`} //Use the index for unique a name field
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step3.goodQuantity')}
            id={`GoodDetailsForm.goodQuantity${index}`} //Unique id for TextField
            name={`GoodDetailsForm.goodQuantity-${index}`} //Use the index for unique a name field
            sx={{ flex: 1 }}
            required
            error={!!errors?.goods?.[index]?.goodQuantityStep3}
            helperText={
              errors?.goods?.[index]?.goodQuantityStep3?.message
                ? translate(errors?.goods[index]?.goodQuantityStep3?.message || '')
                : ''
            }
          />
        )}
      />
      {formsCount > 1 ? <DeleteIcon sx={{ cursor: 'pointer' }} onClick={onDeleteHandler} /> : null}
    </Box>
  )
}
