import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import GoodDetailsForm from './GoodDetailsForm'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import { NewDeliveryStep3FormData } from '@/schemas/newDeliverySchemas'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'

export default function NewDeliveryStep3Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep3FormData>) {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()

  const initialGoodType = [
    translate('newDelivery.goodType.pallets'),
    translate('newDelivery.goodType.packages'),
    translate('newDelivery.goodType.pieces')
  ]

  let initialValue: number[] = [0]

  if (formsData.goods) {
    initialValue = formsData.goods.map((_: any, index: number) => index)
  }
  const [goodDetailsForms, setGoodDetailsForms] = useState<number[]>(initialValue) //List with forms indexes
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
// import { useState } from 'react'
// import { NewDeliveryStep3FormData } from '@/schemas/newDeliverySchemas'
// import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'

// export default function NewDeliveryStep3Form({
//   control,
//   formState: { errors }
// }: UseFormReturn<NewDeliveryStep3FormData>) {
//   const { t: translate } = useTranslation()
//   const { formsData } = useNewDeliveryContext()

//   const initialGoodType = [
//     translate('newDelivery.goodType.pallets'),
//     translate('newDelivery.goodType.packages'),
//     translate('newDelivery.goodType.pieces')
//   ]

//   const [goodDetailsForms, setGoodDetailsForms] = useState<number[]>([0]) //List with forms indexes
//   // const [goodDetailsForms, setGoodDetailsForms] = useState<number[]>(
//   //   formsData?.goods ? formsData.goods : [0]
//   // )
//   //List with forms indexes
//   const [selectedGoodTypes, setSelectedGoodTypes] = useState<(string | null)[]>([null])

//   function onDeleteHandler(index: number) {
//     const updatedForms = goodDetailsForms.filter((_, id) => id !== index)
//     const updatedSelectedGoodTypes = selectedGoodTypes.filter((_, id) => id !== index)
//     setGoodDetailsForms(updatedForms)
//     setSelectedGoodTypes(updatedSelectedGoodTypes)
//   }

//   function addGoodHandler() {
//     const newIndex = goodDetailsForms.length //New index for the new form
//     setGoodDetailsForms([...goodDetailsForms, newIndex])
//     setSelectedGoodTypes([...selectedGoodTypes, null])
//   }

//   function handleGoodTypeChange(index: number, value: string | null) {
//     const updatedSelectedGoodTypes = [...selectedGoodTypes]
//     updatedSelectedGoodTypes[index] = value
//     setSelectedGoodTypes(updatedSelectedGoodTypes)
//   }

//   function availableGoodTypes(index: number) {
//     return initialGoodType.filter(
//       (type) => !selectedGoodTypes.includes(type) || selectedGoodTypes[index] === type
//     )
//   }

//   const allOptionsSelected =
//     selectedGoodTypes.filter((type) => type !== null).length >= initialGoodType.length

//   return (
//     <>
//       {goodDetailsForms.map((index) => (
//         <GoodDetailsForm
//           key={index}
//           control={control}
//           errors={errors}
//           goodType={availableGoodTypes(index)}
//           onDeleteHandler={() => onDeleteHandler(index)}
//           index={index}
//           formsCount={goodDetailsForms.length}
//           onGoodTypeChange={(value) => handleGoodTypeChange(index, value)} //Pass a function for updating selected goodType
//         />
//       ))}
//       {!allOptionsSelected && (
//         <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={addGoodHandler}>
//           {translate('newDelivery.labels.step3.addGood')}
//         </Button>
//       )}
//     </>
//   )
// }
