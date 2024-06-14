import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import { NewDeliveryStep4FormData } from '@/schemas/newDeliveryStep4'
import MoveGoodsForm from './MoveGoodsForm'

interface NewDeliveryStep4FormProps extends UseFormReturn<NewDeliveryStep4FormData> {
  formsData: any
}

export default function NewDeliveryStep4Form({
  control,
  formState: { errors },
  formsData
}: NewDeliveryStep4FormProps) {
  const { t: translate } = useTranslation()

  // Да са налични само тези, които са в step3
  const goodType = formsData.goods.map((good: any) => good.goodTypeStep3)

  const zones = ['Зона 1', 'Зона 2', 'Зона 3']

  const [moveGoodsForms, setMoveGoodsForms] = useState<number[]>([0]) //Списък с индексите на формите

  function addGoodHandler() {
    const newIndex = moveGoodsForms.length // Нов индекс за новата форма
    setMoveGoodsForms([...moveGoodsForms, newIndex])
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
          index={index} // Предаване на индекса като проп
          formsData={formsData} //Предаване на данните на попълнените форми до момента
        />
      ))}
      <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={addGoodHandler}>
        {translate('newDelivery.labels.step4.addNewMove')}
      </Button>
    </>
  )
}
