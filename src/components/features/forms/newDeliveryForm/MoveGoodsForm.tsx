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
  goodTypes: { title: string; value: string }[]
  zones: { title: string; value: string }[]
  index: number
  onDeleteHandler: () => void
  formsCount: number
}

export default function MoveGoodsForm({
  control,
  errors,
  goodTypes,
  zones,
  index,
  onDeleteHandler,
  formsCount
}: GoodDetailsFormProps) {
  const { t: translate } = useTranslation()
  const { formsData, updateGoodsInZones, deleteGoodsInZones } = useNewDeliveryContext()

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
    //TODO: don't work properly
    if (goodTypeValue === null && goodQuantityValue === '' && zoneValue === null) {
      deleteGoodsInZones(index)
    }

    if (
      (goodTypeValue !== null && goodQuantityValue !== '' && zoneValue !== null) ||
      (goodTypeValue !== null && goodQuantityValue === '' && zoneValue !== null)
    ) {
      updateGoodsInZones(index, {
        goodTypeStep4: goodTypeValue,
        goodQuantityStep4: goodQuantityValue === '' ? 0 : Number(goodQuantityValue),
        zone: zoneValue
      })
    }
  }, [goodTypeValue, zoneValue, goodQuantityValue, index])

  useEffect(() => {
    if (goodTypeValue === null) {
      setFieldsDisabled(true)
      // След това се презаписва с изтритата стойност и не разбирам защо
      setGoodQuantityValue('')
      setZoneValue(null)
      setZoneInputValue('')
    } else {
      setFieldsDisabled(false)
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
            options={goodTypes.map((goodType) => goodType.title)}
            value={goodTypes.find((goodType) => goodType.value === field.value)?.title || null}
            onChange={(_event: any, newValue: string | null, reason) => {
              if (reason === 'clear') {
                onDeleteHandler()
                return
              }

              newValue = newValue
                ? goodTypes.find((goodType) => goodType.title === newValue)?.value || null
                : null
              setGoodTypeValue(newValue)
              field.onChange(newValue)
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
                label={translate('deliveries.newDelivery.labels.step4.goodType')}
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
            label={translate('deliveries.newDelivery.labels.step4.goodQuantity')}
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
            options={zones.map((zone) => zone.title)}
            value={zones.find((zone) => zone.value === field.value)?.title || null}
            onChange={(_event: any, newValue: string | null) => {
              newValue = newValue
                ? zones.find((zone) => zone.title === newValue)?.value || null
                : null
              setZoneValue(newValue)
              field.onChange(newValue)
            }}
            inputValue={zoneInputValue}
            onInputChange={(_event, newInputValue) => {
              setZoneInputValue(newInputValue)
            }}
            id={`moveGoodsForm.controllable-states-demo-zone${index}`}
            sx={{ flex: 1 }}
            disabled={fieldsDisabled}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('deliveries.newDelivery.labels.step4.zone')}
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
