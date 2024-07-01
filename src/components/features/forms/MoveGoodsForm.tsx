import { Box } from '@mui/material'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useEffect, useState } from 'react'
import { NewDeliveryStep4FormData } from '@/schemas/newDeliverySchemas'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import DeleteIcon from '@mui/icons-material/Delete'
import useTranslateGoodTypesOptionsToBulgarian from '@/hooks/useTranslateGoodTypesOptionsToBulgarian'
import useTranslateGoodTypeToBulgarian from '@/hooks/useTranslateGoodTypeToBulgarian'
import useTranslateGoodTypeToEnglish from '@/hooks/useTranslateGoodTypeToEnglish'

interface GoodDetailsFormProps {
  control: Control<NewDeliveryStep4FormData, any>
  errors: FieldErrors<NewDeliveryStep4FormData>
  goodType: string[]
  // zones: string[]
  zones: { title: string; value: string }[]
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
  const { formsData, updateStep4Item, deleteStep4Item } = useNewDeliveryContext()

  const [goodTypeValue, setGoodTypeValue] = useState<string | null>(
    formsData?.goodsInZones ? formsData.goodsInZones[index]?.goodTypeStep4 : null
  )
  const [goodTypeInputValue, setGoodTypeInputValue] = useState('')
  const [goodQuantityValue, setGoodQuantityValue] = useState<string | undefined>(
    formsData?.goodsInZones ? formsData.goodsInZones[index]?.goodQuantityStep4 : ''
  )
  const [zoneValue, setZoneValue] = useState<string | null>(
    formsData?.goodsInZones ? formsData.goodsInZones[index]?.zone : null
  )
  const [zoneInputValue, setZoneInputValue] = useState('')
  const [fieldsDisabled, setFieldsDisabled] = useState(true)

  useEffect(() => {
    // When click to clear goodType and clear all inputs
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
  }, [goodTypeValue, zoneValue, goodQuantityValue, index])

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
        name={`goodsInZones.${index}.goodTypeStep4`}
        control={control}
        defaultValue={
          formsData?.goodsInZones ? formsData.goodsInZones[index]?.goodTypeStep4 || null : null
        }
        render={({ field }) => (
          <Autocomplete
            {...field}
            id={`moveGoodsForm.controllable-states-demo-goodType${index}`}
            options={useTranslateGoodTypesOptionsToBulgarian(goodType)}
            value={useTranslateGoodTypeToBulgarian(goodTypeValue)}
            onChange={(_event: any, newValue: string | null) => {
              const englishValue = useTranslateGoodTypeToEnglish(newValue)
              setGoodTypeValue(englishValue)
              field.onChange(englishValue)
            }}
            inputValue={goodTypeInputValue}
            onInputChange={(_event, newInputValue) => {
              setGoodTypeInputValue(newInputValue)
            }}
            sx={{ flex: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('newDelivery.labels.step4.goodType')}
                error={!!errors?.goodsInZones?.[index]?.goodTypeStep4}
                helperText={
                  errors?.goodsInZones?.[index]?.goodTypeStep4?.message
                    ? translate(errors?.goodsInZones[index]?.goodTypeStep4?.message || '')
                    : ''
                }
              />
            )}
          />
        )}
      />

      <Controller
        name={`goodsInZones.${index}.goodQuantityStep4`}
        control={control}
        defaultValue={
          formsData?.goodsInZones ? formsData.goodsInZones[index]?.goodQuantityStep4 || '' : ''
        }
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
            error={!!errors?.goodsInZones?.[index]?.goodQuantityStep4}
            helperText={
              errors?.goodsInZones?.[index]?.goodQuantityStep4?.message
                ? translate(errors.goodsInZones[index]?.goodQuantityStep4?.message || '')
                : ''
            }
          />
        )}
      />
      <Controller
        name={`goodsInZones.${index}.zone`}
        control={control}
        defaultValue={formsData?.goodsInZones ? formsData.goodsInZones[index]?.zone || null : null}
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
            options={zones.map((zone) => zone.title)}
            sx={{ flex: 1 }}
            disabled={fieldsDisabled}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('newDelivery.labels.step4.zone')}
                error={!!errors?.goodsInZones?.[index]?.zone}
                helperText={
                  errors?.goodsInZones?.[index]?.zone?.message
                    ? translate(errors?.goodsInZones[index]?.zone?.message || '')
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
