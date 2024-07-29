import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { NewDeliveryStep4FormData } from '@/schemas/newDeliverySchemas'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useGenerateId } from '@/hooks/useGenerateId'
import { GoodType } from './NewDeliveryStep3Form'
import MoveGoodsForm from './MoveGoodsForm'
import { Good } from '@/hooks/useSetGoodsType.ts'
import useGetZones from '@/hooks/services/zones/useGetZones'

export default function NewDeliveryStep4Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep4FormData>) {
  const { t: translate } = useTranslation()
  const { formsData, alertMessage, deleteGoodsInZones, isCompletedMove, isExceedQuantity } =
    useNewDeliveryContext()
  const generateId = useGenerateId()
  const zones = useGetZones()

  const goodTypes = formsData.goods.map((good: Good) => {
    const goodType = good.goodTypeStep3
    return {
      title: translate(`deliveries.newDelivery.goodType.${goodType}`),
      value: GoodType[goodType as keyof typeof GoodType]
    }
  })

  const moveGoodsFormsInitialValue = formsData.goodsInZones
    ? formsData.goodsInZones.map(() => generateId())
    : [0]

  const [moveGoodsForms, setMoveGoodsForms] = useState<number[]>(moveGoodsFormsInitialValue)

  const { remove, append } = useFieldArray({
    control,
    name: 'goodsInZones' //the path to the goods array in formsData object, which we need to manage dynamically.
  })

  function addGoodHandler() {
    append({ goodTypeStep4: '', goodQuantityStep4: 1, zone: '' })
    let newId
    do {
      newId = generateId()
    } while (moveGoodsForms.includes(newId))
    setMoveGoodsForms([...moveGoodsForms, newId])
  }

  function onDeleteHandler(index: number) {
    remove(index)
    setMoveGoodsForms((prev) => prev.filter((_, id) => id !== index))
    deleteGoodsInZones(index)
  }

  useEffect(() => {
    if (formsData.goodsInZones) {
      // Update form values when formsData changes
      setMoveGoodsForms(formsData.goodsInZones.map(() => generateId()))
    }
  }, [formsData])

  useEffect(() => {
    if (moveGoodsForms.length === 0) {
      addGoodHandler()
    }
  }, [moveGoodsForms])

  return (
    <>
      <Alert
        variant="outlined"
        severity={isCompletedMove ? 'success' : isExceedQuantity ? 'error' : 'info'}>
        <AlertTitle>
          {isCompletedMove
            ? translate('deliveries.newDelivery.alertMessages.completedMoveTitle')
            : isExceedQuantity
              ? translate('deliveries.newDelivery.alertMessages.exceedTitle')
              : translate('deliveries.newDelivery.alertMessages.leftItemsTitle')}
        </AlertTitle>
        {alertMessage.map((currentMessage, index) => (
          <Box key={index}>{currentMessage}</Box>
        ))}
      </Alert>

      {moveGoodsForms.map((id, index) => (
        <MoveGoodsForm
          key={id}
          control={control}
          errors={errors}
          goodTypes={goodTypes}
          // zones={zones.map((zone) => zone.name!)}
          zones={zones}
          index={index}
          formsCount={moveGoodsForms.length}
          onDeleteHandler={() => onDeleteHandler(index)}
        />
      ))}

      <Button
        variant="contained"
        disabled={isCompletedMove || isExceedQuantity}
        sx={{ alignSelf: 'flex-start' }}
        onClick={addGoodHandler}>
        {translate('deliveries.newDelivery.labels.step4.addNewMove')}
      </Button>
    </>
  )
}
