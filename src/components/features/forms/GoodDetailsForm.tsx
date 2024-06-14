import { Box } from '@mui/material'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import { NewDeliveryStep3FormData } from '@/schemas/newDeliveryStep3'
import { useTranslation } from 'react-i18next'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import React from 'react'

interface GoodDetailsFormProps {
  control: Control<NewDeliveryStep3FormData, any>
  errors: FieldErrors<NewDeliveryStep3FormData>
  goodType: string[]
  deleteHandler: () => void
  index: number
  formsCount: number
}

export default function GoodDetailsForm({
  control,
  errors,
  goodType,
  deleteHandler,
  index,
  formsCount
}: GoodDetailsFormProps) {
  const { t: translate } = useTranslation()

  const [value, setValue] = React.useState<string | null>(null)
  const [inputValue, setInputValue] = React.useState('')

  console.log(formsCount)

  return (
    <Box sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
      <Controller
        name={`goods.${index}.goodType`} // Използване на индекса за уникално име на полето
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue)
              field.onChange(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            id={`controllable-states-demo-${index}`} // Уникален ID за Autocomplete
            options={goodType}
            sx={{ flex: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label={translate('newDelivery.labels.step3.goodType')}
                error={!!errors?.goods?.[index]?.goodType}
                helperText={
                  errors?.goods?.[index]?.goodType?.message
                    ? translate(errors.goods[index].goodType.message) //не мога да го оправя
                    : ''
                }
              />
            )}
          />
        )}
      />
      <Controller
        name={`goods.${index}.goodQuantity`} // Използване на индекса за уникално име на полето
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step3.goodQuantity')}
            id={`goodQuantity-${index}`} // Уникален ID за TextField
            name={`goodQuantity-${index}`} // Уникално име за полето
            sx={{ flex: 1 }}
            required
            error={!!errors?.goods?.[index]?.goodQuantity}
            helperText={
              errors?.goods?.[index]?.goodQuantity?.message
                ? translate(errors.goods[index].goodQuantity.message)
                : ''
            }
          />
        )}
      />
      {formsCount > 1 ? <DeleteIcon sx={{ cursor: 'pointer' }} onClick={deleteHandler} /> : null}
    </Box>
  )
}

// import { Box } from '@mui/material'
// import { Control, Controller, FieldErrors } from 'react-hook-form'
// import DeleteIcon from '@mui/icons-material/Delete'
// import { NewDeliveryStep3FormData } from '@/schemas/newDeliveryStep3'
// import { useTranslation } from 'react-i18next'

// import TextField from '@mui/material/TextField'
// import Autocomplete from '@mui/material/Autocomplete'
// import React from 'react'

// interface GoodDetailsFormProps {
//   control: Control<NewDeliveryStep3FormData, any>
//   errors: FieldErrors<NewDeliveryStep3FormData>
//   goodType: string[]
//   deleteHandler: () => void
// }

// // При "Назад" oт 4 на 3 стъпка Autocomplete е празно, а количеството се запазва.
// // Ако дам направо "напред" празното Autocomplete не се валидира отново.
// export default function GoodDetailsForm({
//   control,
//   errors,
//   goodType,
//   deleteHandler
// }: GoodDetailsFormProps) {
//   const { t: translate } = useTranslation()

//   const [value, setValue] = React.useState<string | null>(null)
//   const [inputValue, setInputValue] = React.useState('')

//   return (
//     <Box sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
//       <Controller
//         name="goodType"
//         control={control}
//         render={({ field }) => (
//           <Autocomplete
//             {...field}
//             value={value}
//             onChange={(event: any, newValue: string | null) => {
//               setValue(newValue)
//               field.onChange(newValue)
//             }}
//             inputValue={inputValue}
//             onInputChange={(event, newInputValue) => {
//               setInputValue(newInputValue)
//             }}
//             id="controllable-states-demo"
//             options={goodType}
//             sx={{ flex: 1 }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 required
//                 label={translate('newDelivery.labels.step3.goodType')}
//                 error={!!errors.goodType}
//                 helperText={errors.goodType?.message ? translate(errors.goodType.message) : ''}
//               />
//             )}
//           />
//         )}
//       />
//       <Controller
//         name="goodQuantity"
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label={translate('newDelivery.labels.step3.goodQuantity')}
//             id="goodQuantity"
//             name="goodQuantity"
//             sx={{ flex: 1 }}
//             required
//             error={!!errors.goodQuantity}
//             helperText={errors.goodQuantity?.message ? translate(errors.goodQuantity.message) : ''}
//           />
//         )}
//       />
//       {!errors.goodType && !errors.goodQuantity ? (
//         <DeleteIcon sx={{ cursor: 'pointer' }} onClick={deleteHandler} />
//       ) : null}
//     </Box>
//   )
// }
