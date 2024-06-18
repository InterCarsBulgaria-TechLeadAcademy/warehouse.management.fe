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
  onDeleteHandler: (goodTypeValue: string | null, quantity: number) => void
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
  const { formsData, goodsTypeQuantityStep4, setGoodTypeQuantityStep4, setAlertQuantities } =
    useNewDeliveryContext()

  const [goodTypeValue, setGoodTypeValue] = useState<string | null>(null)
  const [goodTypeInputValue, setGoodTypeInputValue] = useState('')
  const [zoneValue, setZoneValue] = useState<string | null>(null)
  const [zoneInputValue, setZoneInputValue] = useState('')
  const [goodQuantityValue, setGoodQuantityValue] = useState('')
  const [fieldsDisabled, setFieldsDisabled] = useState(true)

  // console.log(goodsTypeQuantityStep4)
  useEffect(() => {
    if (goodTypeValue !== null && zoneValue !== null && goodQuantityValue !== '') {
      const good = formsData.goods.find((good: any) => good.goodTypeStep3 === goodTypeValue)
      if (good) {
        if (Number(goodQuantityValue) < good.goodQuantityStep3) {
          const newGoodsTypeQuantityStep4 = [...goodsTypeQuantityStep4]
          switch (goodTypeValue) {
            case 'Палети': {
              newGoodsTypeQuantityStep4[0].pallets -= Number(goodQuantityValue)
              return setGoodTypeQuantityStep4(newGoodsTypeQuantityStep4)
            }
            case 'Пакети': {
              newGoodsTypeQuantityStep4[0].packages -= Number(goodQuantityValue)
              return setGoodTypeQuantityStep4(newGoodsTypeQuantityStep4)
            }
            case 'Бройки': {
              newGoodsTypeQuantityStep4[0].pieces -= Number(goodQuantityValue)
              return setGoodTypeQuantityStep4(newGoodsTypeQuantityStep4)
            }
            default:
            // return setPallets(0), setPackets(0), setPieces(0)
          }
        } else if (Number(goodQuantityValue) === good.goodQuantityStep3) {
          // switch (goodTypeValue) {
          //   case 'Палети': {
          //     return setPallets(0)
          //   }
          //   case 'Пакети': {
          //     return setPackets(0)
          //   }
          //   case 'Бройки': {
          //     return setPieces(0)
          //   }
          //   default:
          //     return setPallets(0), setPackets(0), setPieces(0)
          // }
        } else {
          // setStep4Quantity(
          //   `You can place a maximum of ${good.goodQuantityStep3} ${goodTypeValue.toLowerCase()}`
          // )
        }
      }
    } else {
      // setAlertQuantities('')
    }
  }, [
    goodTypeValue,
    zoneValue,
    goodQuantityValue,
    formsData.goods
    // setPallets,
    // setPackets,
    // setPieces
  ])

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
        name={`goods.${index}.goodTypeStep4`} // Use the index for a unique field name
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
            id={`moveGoodsForm.controllable-states-demo-goodType${index}`} // Unique id for Autocomplete
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
        name={`goods.${index}.goodQuantityStep4`} // Use the index for a unique field name
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step4.goodQuantity')}
            id={`moveGoodsForm.goodQuantity${index}`} // Unique id for TextField
            name={`moveGoodsForm.goodQuantity${index}`} // Use the index for a unique field name
            sx={{ flex: 1 }}
            required
            disabled={fieldsDisabled} // Disable the field when goodType is not selected
            value={fieldsDisabled ? '' : goodQuantityValue} // Set the base value when fields are disabled
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
        name={`goods.${index}.zone`} // Use the index for a unique field name
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
            id={`moveGoodsForm.controllable-states-demo-zone${index}`} // Unique id for Autocomplete
            options={zones}
            sx={{ flex: 1 }}
            disabled={fieldsDisabled} // Disable the field when goodType is not selected
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
      {formsCount > 1 ? (
        <DeleteIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => onDeleteHandler(goodTypeValue, Number(goodQuantityValue))}
        />
      ) : null}
    </Box>
  )
}
