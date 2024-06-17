import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import MoveGoodsForm from './MoveGoodsForm'
import { NewDeliveryStep4FormData } from '@/schemas/newDeliverySchemas'

interface NewDeliveryStep4FormProps extends UseFormReturn<NewDeliveryStep4FormData> {
  formsData: any
}

export default function NewDeliveryStep4Form({
  control,
  formState: { errors },
  formsData
}: NewDeliveryStep4FormProps) {
  const { t: translate } = useTranslation()

  //Only the goodType selected in step 3 should be available
  const goodType = formsData.goods.map((good: any) => good.goodTypeStep3)

  const zones = ['Зона 1', 'Зона 2', 'Зона 3']

  const [moveGoodsForms, setMoveGoodsForms] = useState<number[]>([0]) //List with form indexes

  function addGoodHandler() {
    const newIndex = moveGoodsForms.length //New index for the new form
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
          index={index}
          formsData={formsData}
        />
      ))}
      <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={addGoodHandler}>
        {translate('newDelivery.labels.step4.addNewMove')}
      </Button>
    </>
  )
}
