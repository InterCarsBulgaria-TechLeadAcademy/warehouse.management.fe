import { Box } from '@mui/material'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import React, { useEffect } from 'react'
import { NewDeliveryStep3FormData } from '@/schemas/newDeliverySchemas'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'

interface GoodDetailsFormProps {
  control: Control<NewDeliveryStep3FormData, any>
  errors: FieldErrors<NewDeliveryStep3FormData>
  goodTypes: { title: string; value: string }[]
  onDeleteHandler: () => void
  index: number
  formsCount: number
  onGoodTypeChange: (value: string | null) => void //Add a function for update selected goodType
}

export default function GoodDetailsForm({
  control,
  errors,
  goodTypes,
  onDeleteHandler,
  index,
  formsCount,
  onGoodTypeChange
}: GoodDetailsFormProps) {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()

  const [value, setValue] = React.useState<string | null>(
    formsData?.goods ? formsData.goods[index]?.goodTypeStep3 : null
  )
  const [goodQuantityValue, setGoodQuantityValue] = React.useState<string | undefined>(
    formsData?.goods ? formsData.goods[index]?.goodQuantityStep3 : ''
  )
  const [fieldsDisabled, setFieldsDisabled] = React.useState(true)

  useEffect(() => {
    if (value === null) {
      setFieldsDisabled(true)
      setGoodQuantityValue('')
    } else {
      setFieldsDisabled(false)
    }
  }, [value])

  return (
    <Box sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
      <Controller
        name={`goods.${index}.goodTypeStep3`} //Use the index for unique a name field
        control={control}
        defaultValue={formsData?.goods ? formsData.goods[index]?.goodTypeStep3 || null : null}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id={`GoodDetailsForm.controllable-states-demo${index}`} //Unique id for Autocomplete
            options={goodTypes.map((goodType) => goodType.title)}
            value={goodTypes.find((goodType) => goodType.value === field.value)?.title || null}
            onChange={(_event: any, newValue: string | null) => {
              newValue = newValue
                ? goodTypes.find((goodType) => goodType.title === newValue)?.value || null
                : null
              setValue(newValue)
              field.onChange(newValue)
              onGoodTypeChange(newValue)
            }}
            sx={{ flex: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('deliveries.newDelivery.labels.step3.goodType')}
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
        defaultValue={formsData?.goods ? formsData.goods[index]?.goodQuantityStep3 || '' : ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('deliveries.newDelivery.labels.step3.goodQuantity')}
            id={`GoodDetailsForm.goodQuantity${index}`} //Unique id for TextField
            name={`GoodDetailsForm.goodQuantity-${index}`} //Use the index for unique a name field
            required
            value={goodQuantityValue}
            onChange={(e) => {
              const inputValue = e.target.value
              // Check if entiry value is a number
              if (inputValue === '' || !isNaN(Number(inputValue))) {
                setGoodQuantityValue(inputValue)
                field.onChange(inputValue)
              }
            }}
            disabled={fieldsDisabled}
            sx={{ flex: 1 }}
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
