import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import MoveGoodsForm from './MoveGoodsForm'
import { NewDeliveryStep4FormData } from '@/schemas/newDeliverySchemas'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'

export default function NewDeliveryStep4Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep4FormData>) {
  const { t: translate } = useTranslation()
  const { formsData, alertQuantities, goodsTypeQuantityStep4, setGoodTypeQuantityStep4 } =
    useNewDeliveryContext()

  //Only the goodType selected in step 3 should be available
  const goodType = formsData.goods.map((good: any) => good.goodTypeStep3)

  const zones = ['Зона 1', 'Зона 2', 'Зона 3']

  const [moveGoodsForms, setMoveGoodsForms] = useState<number[]>([0]) //List with form indexes

  function addGoodHandler() {
    const newIndex = moveGoodsForms.length //New index for the new form
    setMoveGoodsForms([...moveGoodsForms, newIndex])
  }

  // function onDeleteHandler(index: number, goodQuantityValue: number) {
  function onDeleteHandler(index: number, goodTypeValue: string | null, goodQuantityValue: number) {
    const updatedForms = moveGoodsForms.filter((_, id) => id !== index)
    setMoveGoodsForms(updatedForms)

    if (typeof goodTypeValue === 'string') {
      console.log(`goodTypeValue:${goodTypeValue}`)
      console.log(`goodQuantityValue:${goodQuantityValue}`)
      const newGoodsTypeQuantityStep4: any = [...goodsTypeQuantityStep4]
      switch (goodTypeValue) {
        case 'Палети': {
          newGoodsTypeQuantityStep4[0].pallets += Number(goodQuantityValue)
          return setGoodTypeQuantityStep4(newGoodsTypeQuantityStep4)
        }
        case 'Пакети': {
          newGoodsTypeQuantityStep4[0].packages += Number(goodQuantityValue)
          return setGoodTypeQuantityStep4(newGoodsTypeQuantityStep4)
        }
        case 'Бройки': {
          newGoodsTypeQuantityStep4[0].pieces += Number(goodQuantityValue)
          return setGoodTypeQuantityStep4(newGoodsTypeQuantityStep4)
        }
      }
    }
  }

  return (
    <>
      {moveGoodsForms.map((index) => (
        <MoveGoodsForm
          key={index}
          control={control}
          errors={errors}
          goodType={goodType}
          zones={zones}
          index={index}
          formsCount={moveGoodsForms.length}
          onDeleteHandler={(goodTypeValue: string | null, quantity: number) =>
            onDeleteHandler(index, goodTypeValue, quantity)
          }
        />
      ))}
      <Box>{alertQuantities}</Box>
      <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={addGoodHandler}>
        {translate('newDelivery.labels.step4.addNewMove')}
      </Button>
    </>
  )
}
