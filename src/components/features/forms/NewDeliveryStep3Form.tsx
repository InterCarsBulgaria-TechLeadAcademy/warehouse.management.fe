import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import GoodDetailsForm from './GoodDetailsForm'
import { UseFormReturn } from 'react-hook-form'
import { NewDeliveryStep3FormData } from '@/schemas/newDeliveryStep3'
import React, { useState } from 'react'

export default function NewDeliveryStep3Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep3FormData>) {
  const { t: translate } = useTranslation()

  const initialForms = [
    {
      id: 1,
      goodType: '',
      goodQuantity: ''
    }
  ]

  const [forms, setForms] = useState(initialForms)

  const goodType = [
    translate('newDelivery.goodType.pallets'),
    translate('newDelivery.goodType.packages'),
    translate('newDelivery.goodType.pieces')
  ]

  function deleteHandler(index) {
    console.log('clicked form at index:', index)
    const updatedForms = forms.filter((_, idx) => idx !== index)
    setForms(updatedForms)
  }

  function addGoodHandler() {
    const newForm = {
      id: forms.length + 1,
      goodType: '',
      goodQuantity: ''
    }
    setForms([...forms, newForm])
  }

  return (
    <>
      {forms.map((form, index) => (
        <div key={form.id}>
          <GoodDetailsForm
            key={form.id}
            control={control}
            errors={errors}
            goodType={goodType}
            deleteHandler={() => deleteHandler(index)}
          />
        </div>
      ))}

      <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={addGoodHandler}>
        {translate('newDelivery.labels.step3.addGood')}
      </Button>
    </>
  )
}

// import { NewDeliveryStep3FormData } from '@/schemas/newDeliveryStep3'
// import {
//   Box,
//   Checkbox,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   ListItemText,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   TextField
// } from '@mui/material'
// import { Controller, UseFormReturn } from 'react-hook-form'
// import { useTranslation } from 'react-i18next'
// import DeleteIcon from '@mui/icons-material/Delete'

// export default function NewDeliveryStep3Form({
//   control,
//   formState: { errors }
// }: UseFormReturn<NewDeliveryStep3FormData>) {
//   const { t: translate } = useTranslation()

//   //изнеси го от тук
//   const goodType = [
//     translate('newDelivery.goodType.pallets'),
//     translate('newDelivery.goodType.packages'),
//     translate('newDelivery.goodType.pieces')
//   ]

//   function deleteHandler() {
//     console.log('clicked')
//   }

//   return (
//     <Box component="form" sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
//       <Controller
//         name="goodType"
//         control={control}
//         render={({ field }) => (
//           <FormControl sx={{ flex: 1 }}>
//             <InputLabel id="demo-multiple-checkbox-label" required>
//               {translate('newDelivery.labels.step3.goodType')}
//             </InputLabel>
//             <Select
//               {...field}
//               labelId="demo-multiple-checkbox-label"
//               id="demo-multiple-checkbox"
//               required
//               multiple
//               value={field.value || []}
//               onChange={(e) => field.onChange(e.target.value)}
//               input={<OutlinedInput />}
//               renderValue={(selected) => (selected as string[]).join(', ')}>
//               {goodType.map((currentGoodType) => (
//                 <MenuItem key={currentGoodType} value={currentGoodType}>
//                   <Checkbox checked={field.value?.includes(currentGoodType)} />{' '}
//                   <ListItemText primary={currentGoodType} />
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.goodType && (
//               <FormHelperText>
//                 {errors.goodType?.message ? translate(errors.goodType.message) : ''}
//               </FormHelperText>
//             )}
//           </FormControl>
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
//             sx={{
//               flex: 1
//             }}
//             required
//             error={!!errors.goodQuantity}
//             helperText={errors.goodQuantity?.message ? translate(errors.goodQuantity.message) : ''}
//           />
//         )}
//       />

//       <DeleteIcon sx={{ cursor: 'pointer' }} onClick={deleteHandler} />
//     </Box>
//   )
// }
