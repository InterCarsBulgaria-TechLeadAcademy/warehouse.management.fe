import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import GoodDetailsForm from './GoodDetailsForm'
import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { NewDeliveryStep3FormData } from '@/schemas/newDeliverySchemas'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import { useGenerateId } from '@/hooks/useGenerateId.ts'

export default function NewDeliveryStep3Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep3FormData>) {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()
  const generateId = useGenerateId()

  const { remove, append } = useFieldArray({
    control,
    name: 'goods' //the path to the goods array in formsData object, which we need to manage dynamically.
  })

  const initialGoodType = ['pallets', 'packages', 'pieces']

  // Initialize goodDetailsForms and selectedGoodTypes based on formsData.goods
  const goodDetailsFormsInitialValue = formsData.goods
    ? formsData.goods.map(() => generateId())
    : [0]
  const selectedGoodTypesInitialValue = formsData.goods
    ? formsData.goods.map((good: any) => good.goodTypeStep3 || '')
    : ['']

  const [goodDetailsForms, setGoodDetailsForms] = useState<number[]>(goodDetailsFormsInitialValue)
  const [selectedGoodTypes, setSelectedGoodTypes] = useState<string[]>(
    selectedGoodTypesInitialValue
  )

  function addGoodHandler() {
    append({ goodTypeStep3: '', goodQuantityStep3: 1 }) // add this object in goods array in formsData object
    setGoodDetailsForms((prev) => [...prev, generateId()])
    setSelectedGoodTypes((prev) => [...prev, ''])
  }

  function onDeleteHandler(index: number) {
    // TODO: don't work properly
    remove(index) // This removes the item from goods array in formsData object
    setGoodDetailsForms((prev) => prev.filter((_, id) => id !== index))
    setSelectedGoodTypes((prev) => prev.filter((_, id) => id !== index))
  }

  function handleGoodTypeChange(index: number, value: string | null) {
    setSelectedGoodTypes((prev) => {
      const updated = [...prev]
      updated[index] = value || ''
      return updated
    })
  }

  function availableGoodTypes(index: number) {
    return initialGoodType.filter(
      (type) => !selectedGoodTypes.includes(type) || selectedGoodTypes[index] === type
    )
  }

  const allOptionsSelected =
    selectedGoodTypes.filter((type) => type !== '').length >= initialGoodType.length

  useEffect(() => {
    if (formsData.goods) {
      // Update form values when formsData changes
      setGoodDetailsForms(formsData.goods.map(() => generateId()))
      setSelectedGoodTypes(formsData.goods.map((good: any) => good.goodTypeStep3 || ''))
    }
  }, [formsData])

  return (
    <>
      {goodDetailsForms.map((id, index) => (
        <GoodDetailsForm
          key={id}
          control={control}
          errors={errors}
          goodType={availableGoodTypes(index)}
          onDeleteHandler={() => onDeleteHandler(index)}
          index={index}
          formsCount={goodDetailsForms.length}
          onGoodTypeChange={(value) => handleGoodTypeChange(index, value)} // Pass a function to change the item type
        />
      ))}
      <Button
        variant="contained"
        sx={{ alignSelf: 'flex-start' }}
        onClick={addGoodHandler}
        disabled={allOptionsSelected}>
        {translate('newDelivery.labels.step3.addGood')}
      </Button>
    </>
  )
}
