import { Box } from '@mui/material'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useEffect, useState } from 'react'
import { NewDeliveryStep4FormData } from '@/schemas/newDeliveryStep4'

interface GoodDetailsFormProps {
  control: Control<NewDeliveryStep4FormData, any>
  errors: FieldErrors<NewDeliveryStep4FormData>
  goodType: string[]
  zones: string[]
  index: number
  formsData: any
}

export default function MoveGoodsForm({
  control,
  errors,
  goodType,
  zones,
  index,
  formsData
}: GoodDetailsFormProps) {
  const { t: translate } = useTranslation()

  const [goodTypeValue, setGoodTypeValue] = useState<string | null>(null)
  const [goodTypeInputValue, setGoodTypeInputValue] = useState('')
  const [zoneValue, setZoneValue] = useState<string | null>(null)
  const [zoneInputValue, setZoneInputValue] = useState('')
  const [goodQuantityValue, setGoodQuantityValue] = useState('')
  const [fieldsDisabled, setFieldsDisabled] = useState(true)

  // За сравняване дали съм въвел по-голямо/по-малко количество от това във степ3 за този продукт
  // if (goodTypeValue !== null && zoneValue !== null && goodQuantityValue !== '') {
  // formsData.goods[0].goodQuantityStep3 ne e ok towa
  //   // if (goodQuantityValue > formsData.goods[0].goodQuantityStep3) {
  //   //   console.log('po-golqmo')
  //   // } else {
  //   //   console.log('po-malko')
  //   // }
  // } else {
  //   console.log('ne')
  // }

  console.log(formsData)
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
        name={`goods.${index}.goodTypeStep4`} // Използване на индекса за уникално име на полето
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
            id={`moveGoodsForm.controllable-states-demo-goodType${index}`} // Уникален ID за Autocomplete
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
        name={`goods.${index}.goodQuantityStep4`} // Използване на индекса за уникално име на полето
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step4.goodQuantity')}
            id={`moveGoodsForm.goodQuantity${index}`} // Уникален ID за TextField
            name={`moveGoodsForm.goodQuantity${index}`} // Уникално име за полето
            sx={{ flex: 1 }}
            required
            disabled={fieldsDisabled} // Деактивиране на полетото при липса на избран тип
            value={fieldsDisabled ? '' : goodQuantityValue} // Задаване на стойността на основата на fieldsDisabled
            onChange={(e) => {
              setGoodQuantityValue(e.target.value)
              field.onChange(e.target.value)
            }}
            error={!!errors?.goods?.[index]?.goodQuantityStep4}
            helperText={
              errors?.goods?.[index]?.goodQuantityStep4?.message
                ? translate(errors?.goods[index]?.goodQuantityStep4?.message || '')
                : ''
            }
          />
        )}
      />
      <Controller
        name={`goods.${index}.zone`} // Използване на индекса за уникално име на полето
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
            id={`moveGoodsForm.controllable-states-demo-zone${index}`} // Уникален ID за Autocomplete
            options={zones}
            sx={{ flex: 1 }}
            disabled={fieldsDisabled} // Деактивиране на полетото при липса на избран тип
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
    </Box>
  )
}
