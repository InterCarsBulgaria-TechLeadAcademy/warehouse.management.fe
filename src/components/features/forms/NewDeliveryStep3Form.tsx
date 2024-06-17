import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import GoodDetailsForm from './GoodDetailsForm'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import { NewDeliveryStep3FormData } from '@/schemas/newDeliverySchemas'

export default function NewDeliveryStep3Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep3FormData>) {
  const { t: translate } = useTranslation()

  const initialGoodType = [
    translate('newDelivery.goodType.pallets'),
    translate('newDelivery.goodType.packages'),
    translate('newDelivery.goodType.pieces')
  ]

  const [goodDetailsForms, setGoodDetailsForms] = useState<number[]>([0]) //List with forms indexes
  const [selectedGoodTypes, setSelectedGoodTypes] = useState<(string | null)[]>([null])

  function onDeleteHandler(index: number) {
    const updatedForms = goodDetailsForms.filter((_, id) => id !== index)
    const updatedSelectedGoodTypes = selectedGoodTypes.filter((_, id) => id !== index)
    setGoodDetailsForms(updatedForms)
    setSelectedGoodTypes(updatedSelectedGoodTypes)
  }

  function addGoodHandler() {
    const newIndex = goodDetailsForms.length //New index for the new form
    setGoodDetailsForms([...goodDetailsForms, newIndex])
    setSelectedGoodTypes([...selectedGoodTypes, null])
  }

  function handleGoodTypeChange(index: number, value: string | null) {
    const updatedSelectedGoodTypes = [...selectedGoodTypes]
    updatedSelectedGoodTypes[index] = value
    setSelectedGoodTypes(updatedSelectedGoodTypes)
  }

  function availableGoodTypes(index: number) {
    return initialGoodType.filter(
      (type) => !selectedGoodTypes.includes(type) || selectedGoodTypes[index] === type
    )
  }

  const allOptionsSelected =
    selectedGoodTypes.filter((type) => type !== null).length >= initialGoodType.length

  return (
    <>
      {goodDetailsForms.map((index) => (
        <GoodDetailsForm
          key={index}
          control={control}
          errors={errors}
          goodType={availableGoodTypes(index)}
          onDeleteHandler={() => onDeleteHandler(index)}
          index={index}
          formsCount={goodDetailsForms.length}
          onGoodTypeChange={(value) => handleGoodTypeChange(index, value)} //Pass a function for updating selected goodType
        />
      ))}
      {!allOptionsSelected && (
        <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={addGoodHandler}>
          {translate('newDelivery.labels.step3.addGood')}
        </Button>
      )}
    </>
  )
}

// import { Button } from '@mui/material'
// import { useTranslation } from 'react-i18next'
// import GoodDetailsForm from './GoodDetailsForm'
// import { UseFormReturn } from 'react-hook-form'
// import { NewDeliveryStep3FormData } from '@/schemas/newDeliveryStep3'
// import { useState } from 'react'

// export default function NewDeliveryStep3Form({
//   control,
//   formState: { errors }
// }: UseFormReturn<NewDeliveryStep3FormData>) {
//   const { t: translate } = useTranslation()
//   const goodType = [
//     translate('newDelivery.goodType.pallets'),
//     translate('newDelivery.goodType.packages'),
//     translate('newDelivery.goodType.pieces')
//   ]

//   const [goodDetailsFormCount, setGoodDetailsFormCount] = useState(1)

//   function onDeleteHandler() {}

//   function addGoodHandler() {}

//   return (
//     <>
//       <GoodDetailsForm
//         control={control}
//         errors={errors}
//         goodType={goodType}
//         onDeleteHandler={onDeleteHandler}
//       />
//       <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={addGoodHandler}>
//         {translate('newDelivery.labels.step3.addGood')}
//       </Button>
//     </>
//   )
// }

{
  /* import { NewDeliveryStep3FormData } from '@/schemas/newDeliveryStep3'
import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import DeleteIcon from '@mui/icons-material/Delete'

export default function NewDeliveryStep3Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep3FormData>) {
  const { t: translate } = useTranslation()

  //изнеси го от тук
  const goodType = [
    translate('newDelivery.goodType.pallets'),
    translate('newDelivery.goodType.packages'),
    translate('newDelivery.goodType.pieces')
  ]

  function onDeleteHandler() {
    console.log('clicked')
  }

  return (
    <Box component="form" sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
      <Controller
        name="goodType"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ flex: 1 }}>
            <InputLabel id="demo-multiple-checkbox-label" required>
              {translate('newDelivery.labels.step3.goodType')}
            </InputLabel>
            <Select
              {...field}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              required
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => (selected as string[]).join(', ')}>
              {goodType.map((currentGoodType) => (
                <MenuItem key={currentGoodType} value={currentGoodType}>
                  <Checkbox checked={field.value?.includes(currentGoodType)} />{' '}
                  <ListItemText primary={currentGoodType} />
                </MenuItem>
              ))}
            </Select>
            {errors.goodType && (
              <FormHelperText>
                {errors.goodType?.message ? translate(errors.goodType.message) : ''}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="goodQuantity"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step3.goodQuantity')}
            id="goodQuantity"
            name="goodQuantity"
            sx={{
              flex: 1
            }}
            required
            error={!!errors.goodQuantity}
            helperText={errors.goodQuantity?.message ? translate(errors.goodQuantity.message) : ''}
          />
        )}
      />

      <DeleteIcon sx={{ cursor: 'pointer' }} onClick={onDeleteHandler} />
    </Box>
  )
} */
}
