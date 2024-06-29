import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import MoveGoodsForm from './MoveGoodsForm'
import { NewDeliveryStep4FormData } from '@/schemas/newDeliverySchemas'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { generateUniqueNumber } from '@/utils/generateUniqueNumber'

export default function NewDeliveryStep4Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep4FormData>) {
  const { t: translate } = useTranslation()
  const { formsData, alertMessage, deleteStep4Item, isCompletedMove, isExceedQuantity } =
    useNewDeliveryContext()

  // След като мога да минавам на стъпка 5 да оправя при "Назад" да се зарежда попълнената форма
  const goodType = formsData.goods.map((good: any) => good.goodTypeStep3)
  const zones = ['Зона 1', 'Зона 2', 'Зона 3']

  const [moveGoodsForms, setMoveGoodsForms] = useState<number[]>([generateUniqueNumber()])

  function addGoodHandler() {
    let newId = generateUniqueNumber()
    while (moveGoodsForms.includes(newId)) {
      newId = generateUniqueNumber()
    }
    setMoveGoodsForms([...moveGoodsForms, newId])
  }

  function onDeleteHandler(id: number, index: number) {
    const updatedForms = moveGoodsForms.filter((formId) => formId !== id)
    setMoveGoodsForms(updatedForms)
    deleteStep4Item(index)
  }

  return (
    <>
      <Alert
        variant="outlined"
        severity={isCompletedMove ? 'success' : isExceedQuantity ? 'error' : 'info'}>
        <AlertTitle>
          {isCompletedMove
            ? translate('newDelivery.alertMessages.completedMoveTitle')
            : isExceedQuantity
              ? translate('newDelivery.alertMessages.exceedTitle')
              : translate('newDelivery.alertMessages.leftItemsTitle')}
        </AlertTitle>
        {alertMessage.map((currentMessage) => (
          <Box>{currentMessage}</Box>
        ))}
      </Alert>

      {moveGoodsForms.map((id, index) => (
        <MoveGoodsForm
          key={id}
          control={control}
          errors={errors}
          goodType={goodType}
          zones={zones}
          id={id}
          index={index}
          formsCount={moveGoodsForms.length}
          onDeleteHandler={() => onDeleteHandler(id, index)}
        />
      ))}

      <Button
        variant="contained"
        disabled={isCompletedMove || isExceedQuantity}
        sx={{ alignSelf: 'flex-start' }}
        onClick={addGoodHandler}>
        {translate('newDelivery.labels.step4.addNewMove')}
      </Button>
    </>
  )
}
