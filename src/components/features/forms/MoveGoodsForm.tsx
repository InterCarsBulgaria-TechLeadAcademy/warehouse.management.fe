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
  zones: string[]
  id: number
  index: number
  onDeleteHandler: () => void
  formsCount: number
}

export default function MoveGoodsForm({
  control,
  errors,
  goodType,
  zones,
  id,
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
  }, [goodTypeValue, zoneValue, goodQuantityValue, id])

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

  // Make controlled components
  return (
    <Box sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
      <Controller
        name={`goods.${id}.goodTypeStep4`}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
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
            id={`moveGoodsForm.controllable-states-demo-goodType${id}`}
            options={useTranslateGoodTypesOptionsToBulgarian(goodType)}
            sx={{ flex: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('newDelivery.labels.step4.goodType')}
                error={!!errors?.goodsInZones?.[id]?.goodTypeStep4}
                helperText={
                  errors?.goodsInZones?.[id]?.goodTypeStep4?.message
                    ? translate(errors?.goodsInZones[id]?.goodTypeStep4?.message || '')
                    : ''
                }
              />
            )}
          />
        )}
      />
      <Controller
        name={`goods.${id}.goodQuantityStep4`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step4.goodQuantity')}
            id={`moveGoodsForm.goodQuantity${id}`}
            name={`moveGoodsForm.goodQuantity${id}`}
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
            error={!!errors?.goodsInZones?.[id]?.goodQuantityStep4}
            helperText={
              errors?.goodsInZones?.[id]?.goodQuantityStep4?.message
                ? translate(errors.goodsInZones[id]?.goodQuantityStep4?.message || '')
                : ''
            }
          />
        )}
      />
      <Controller
        name={`goods.${id}.zone`}
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
            id={`moveGoodsForm.controllable-states-demo-zone${id}`}
            options={zones}
            sx={{ flex: 1 }}
            disabled={fieldsDisabled}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('newDelivery.labels.step4.zone')}
                error={!!errors?.goodsInZones?.[id]?.zone}
                helperText={
                  errors?.goodsInZones?.[id]?.zone?.message
                    ? translate(errors?.goodsInZones[id]?.zone?.message || '')
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

// import { Box } from '@mui/material'
// import { Control, Controller, FieldErrors } from 'react-hook-form'
// import { useTranslation } from 'react-i18next'
// import TextField from '@mui/material/TextField'
// import Autocomplete from '@mui/material/Autocomplete'
// import { useEffect, useState } from 'react'
// import { NewDeliveryStep4FormData } from '@/schemas/newDeliverySchemas'
// import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
// import DeleteIcon from '@mui/icons-material/Delete'
// import useTranslateGoodTypesOptionsToBulgarian from '@/hooks/useTranslateGoodTypesOptionsToBulgarian'
// import useTranslateGoodTypeToBulgarian from '@/hooks/useTranslateGoodTypeToBulgarian'
// import useTranslateGoodTypeToEnglish from '@/hooks/useTranslateGoodTypeToEnglish'

// interface GoodDetailsFormProps {
//   control: Control<NewDeliveryStep4FormData, any>
//   errors: FieldErrors<NewDeliveryStep4FormData>
//   goodType: string[]
//   zones: string[]
//   id: number
//   index: number
//   onDeleteHandler: () => void
//   formsCount: number
// }

// export default function MoveGoodsForm({
//   control,
//   errors,
//   goodType,
//   zones,
//   id,
//   index,
//   onDeleteHandler,
//   formsCount
// }: GoodDetailsFormProps) {
//   const { t: translate } = useTranslation()
//   const { updateStep4Item, deleteStep4Item } = useNewDeliveryContext()

//   const [goodTypeValue, setGoodTypeValue] = useState<string | null>(null)
//   const [goodTypeInputValue, setGoodTypeInputValue] = useState('')
//   const [zoneValue, setZoneValue] = useState<string | null>(null)
//   const [zoneInputValue, setZoneInputValue] = useState('')
//   const [goodQuantityValue, setGoodQuantityValue] = useState<string | undefined>('')
//   const [fieldsDisabled, setFieldsDisabled] = useState(true)

//   useEffect(() => {
//     // When click to clear goodType and clear all inputs
//     if (goodTypeValue === null && goodQuantityValue === '' && zoneValue === null) {
//       deleteStep4Item(index)
//     }

//     if (
//       (goodTypeValue !== null && goodQuantityValue !== '' && zoneValue !== null) ||
//       (goodTypeValue !== null && goodQuantityValue === '' && zoneValue !== null)
//     ) {
//       updateStep4Item(index, {
//         type: goodTypeValue,
//         quantity: goodQuantityValue === '' ? 0 : Number(goodQuantityValue),
//         zone: zoneValue
//       })
//     }
//   }, [goodTypeValue, zoneValue, goodQuantityValue, id])

//   useEffect(() => {
//     if (goodTypeValue) {
//       setFieldsDisabled(false)
//     } else {
//       setFieldsDisabled(true)
//       setGoodQuantityValue('')
//       setZoneValue(null)
//       setZoneInputValue('')
//     }
//   }, [goodTypeValue])

//   return (
//     <Box sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
//       <Controller
//         name={`goods.${id}.goodTypeStep4`}
//         control={control}
//         render={({ field }) => (
//           <Autocomplete
//             {...field}
//             value={useTranslateGoodTypeToBulgarian(goodTypeValue)}
//             onChange={(_event: any, newValue: string | null) => {
//               const englishValue = useTranslateGoodTypeToEnglish(newValue)
//               setGoodTypeValue(englishValue)
//               field.onChange(englishValue)
//             }}
//             inputValue={goodTypeInputValue}
//             onInputChange={(_event, newInputValue) => {
//               setGoodTypeInputValue(newInputValue)
//             }}
//             id={`moveGoodsForm.controllable-states-demo-goodType${id}`}
//             options={useTranslateGoodTypesOptionsToBulgarian(goodType)}
//             sx={{ flex: 1 }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 required
//                 label={translate('newDelivery.labels.step4.goodType')}
//                 error={!!errors?.goods?.[id]?.goodTypeStep4}
//                 helperText={
//                   errors?.goods?.[id]?.goodTypeStep4?.message
//                     ? translate(errors?.goods[id]?.goodTypeStep4?.message || '')
//                     : ''
//                 }
//               />
//             )}
//           />
//         )}
//       />
//       <Controller
//         name={`goods.${id}.goodQuantityStep4`}
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label={translate('newDelivery.labels.step4.goodQuantity')}
//             id={`moveGoodsForm.goodQuantity${id}`}
//             name={`moveGoodsForm.goodQuantity${id}`}
//             sx={{ flex: 1 }}
//             required
//             disabled={fieldsDisabled}
//             value={fieldsDisabled ? '' : goodQuantityValue}
//             onChange={(e) => {
//               const inputValue = e.target.value
//               // Check if entiry value is a number
//               if (inputValue === '' || !isNaN(Number(inputValue))) {
//                 setGoodQuantityValue(inputValue)
//                 field.onChange(inputValue)
//               }
//             }}
//             error={!!errors?.goods?.[id]?.goodQuantityStep4}
//             helperText={
//               errors?.goods?.[id]?.goodQuantityStep4?.message
//                 ? translate(errors.goods[id]?.goodQuantityStep4?.message || '')
//                 : ''
//             }
//           />
//         )}
//       />
//       <Controller
//         name={`goods.${id}.zone`}
//         control={control}
//         render={({ field }) => (
//           <Autocomplete
//             {...field}
//             value={zoneValue}
//             onChange={(_event: any, newValue: string | null) => {
//               setZoneValue(newValue)
//               field.onChange(newValue)
//             }}
//             inputValue={zoneInputValue}
//             onInputChange={(_event, newInputValue) => {
//               setZoneInputValue(newInputValue)
//             }}
//             id={`moveGoodsForm.controllable-states-demo-zone${id}`}
//             options={zones}
//             sx={{ flex: 1 }}
//             disabled={fieldsDisabled}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 required
//                 label={translate('newDelivery.labels.step4.zone')}
//                 error={!!errors?.goods?.[id]?.zone}
//                 helperText={
//                   errors?.goods?.[id]?.zone?.message
//                     ? translate(errors?.goods[id]?.zone?.message || '')
//                     : ''
//                 }
//               />
//             )}
//           />
//         )}
//       />
//       {formsCount > 1 ? <DeleteIcon sx={{ cursor: 'pointer' }} onClick={onDeleteHandler} /> : null}
//     </Box>
//   )
// }
