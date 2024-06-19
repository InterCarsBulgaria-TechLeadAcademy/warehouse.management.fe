import { Box } from '@mui/material'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useEffect, useState } from 'react'
import { NewDeliveryStep4FormData } from '@/schemas/newDeliverySchemas'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import DeleteIcon from '@mui/icons-material/Delete'

interface GoodDetailsFormProps {
  control: Control<NewDeliveryStep4FormData, any>
  errors: FieldErrors<NewDeliveryStep4FormData>
  goodType: string[]
  zones: string[]
  index: number
  onDeleteHandler: () => void
  formsCount: number
}

export default function MoveGoodsForm({
  control,
  errors,
  goodType,
  zones,
  index,
  onDeleteHandler,
  formsCount
}: GoodDetailsFormProps) {
  const { t: translate } = useTranslation()
  const { updateStep4Item, deleteStep4Item } = useNewDeliveryContext()

  const [goodTypeValue, setGoodTypeValue] = useState<string | null>(null)
  const [goodTypeInputValue, setGoodTypeInputValue] = useState('')
  const [zoneValue, setZoneValue] = useState<string | null>(null)
  const [zoneInputValue, setZoneInputValue] = useState('')
  const [goodQuantityValue, setGoodQuantityValue] = useState<string | undefined>('')
  const [fieldsDisabled, setFieldsDisabled] = useState(true)

  useEffect(() => {
    // When i click to clear goodType and clear all inputs
    if (goodTypeValue === null && goodQuantityValue === '' && zoneValue === null) {
      deleteStep4Item(index)
    }
    if (
      (goodTypeValue !== null && goodQuantityValue !== '' && zoneValue !== null) ||
      (goodTypeValue !== null && goodQuantityValue === '' && zoneValue !== null)
    ) {
      updateStep4Item(index, {
        type: goodTypeValue,
        quantity: goodQuantityValue === '' ? 0 : Number(goodQuantityValue),
        zone: zoneValue
      })
    }
  }, [goodTypeValue, zoneValue, goodQuantityValue, index, updateStep4Item])

  useEffect(() => {
    if (goodTypeValue) {
      setFieldsDisabled(false)
    } else {
      setFieldsDisabled(true)
      setGoodQuantityValue('')
      setZoneValue(null)
      setZoneInputValue('')
    }
  }, [goodTypeValue])

  return (
    <Box sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
      <Controller
        name={`goods.${index}.goodTypeStep4`}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={goodTypeValue}
            onChange={(_event: any, newValue: string | null) => {
              setGoodTypeValue(newValue)
              field.onChange(newValue)
            }}
            inputValue={goodTypeInputValue}
            onInputChange={(_event, newInputValue) => {
              setGoodTypeInputValue(newInputValue)
            }}
            id={`moveGoodsForm.controllable-states-demo-goodType${index}`}
            options={goodType}
            sx={{ flex: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('newDelivery.labels.step4.goodType')}
                error={!!errors?.goods?.[index]?.goodTypeStep4}
                helperText={
                  errors?.goods?.[index]?.goodTypeStep4?.message
                    ? translate(errors?.goods[index]?.goodTypeStep4?.message || '')
                    : ''
                }
              />
            )}
          />
        )}
      />
      <Controller
        name={`goods.${index}.goodQuantityStep4`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step4.goodQuantity')}
            id={`moveGoodsForm.goodQuantity${index}`}
            name={`moveGoodsForm.goodQuantity${index}`}
            sx={{ flex: 1 }}
            required
            disabled={fieldsDisabled}
            value={fieldsDisabled ? '' : goodQuantityValue}
            onChange={(e) => {
              const inputValue = e.target.value
              // Check if entiry value is a number
              if (inputValue === '' || !isNaN(Number(inputValue))) {
                setGoodQuantityValue(inputValue)
                field.onChange(inputValue)
              }
            }}
            error={!!errors?.goods?.[index]?.goodQuantityStep4}
            helperText={
              errors?.goods?.[index]?.goodQuantityStep4?.message
                ? translate(errors.goods[index]?.goodQuantityStep4?.message || '')
                : ''
            }
          />
        )}
      />
      <Controller
        name={`goods.${index}.zone`}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={zoneValue}
            onChange={(_event: any, newValue: string | null) => {
              setZoneValue(newValue)
              field.onChange(newValue)
            }}
            inputValue={zoneInputValue}
            onInputChange={(_event, newInputValue) => {
              setZoneInputValue(newInputValue)
            }}
            id={`moveGoodsForm.controllable-states-demo-zone${index}`}
            options={zones}
            sx={{ flex: 1 }}
            disabled={fieldsDisabled}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('newDelivery.labels.step4.zone')}
                error={!!errors?.goods?.[index]?.zone}
                helperText={
                  errors?.goods?.[index]?.zone?.message
                    ? translate(errors?.goods[index]?.zone?.message || '')
                    : ''
                }
              />
            )}
          />
        )}
      />
      {formsCount > 1 ? <DeleteIcon sx={{ cursor: 'pointer' }} onClick={onDeleteHandler} /> : null}
    </Box>
  )
}
