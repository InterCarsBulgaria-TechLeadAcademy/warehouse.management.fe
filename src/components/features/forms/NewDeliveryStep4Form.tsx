import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import MoveGoodsForm from './MoveGoodsForm'
import { NewDeliveryStep4FormData } from '@/schemas/newDeliverySchemas'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import Alert from '@mui/material/Alert'

export default function NewDeliveryStep4Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep4FormData>) {
  const { t: translate } = useTranslation()
  const { formsData, alertMessage, deleteStep4Item, isCompletedMove, isExceedQuantity } =
    useNewDeliveryContext()

  //Only the goodType selected in step 3 should be available
  const goodType = formsData.goods.map((good: any) => good.goodTypeStep3)

  const zones = ['Зона 1', 'Зона 2', 'Зона 3']

  const [moveGoodsForms, setMoveGoodsForms] = useState<number[]>([0]) //List with form indexes

  function addGoodHandler() {
    const newIndex = moveGoodsForms.length //New index for the new form
    setMoveGoodsForms([...moveGoodsForms, newIndex])
  }

  function onDeleteHandler(index: number) {
    // С изтриването на поле модифицирам moveGoodsForms масива, чрез който създавам MoveGoodsForm компонентите
    // Какво следва от това: Когато два moveGoodsForms, например палети, 1 бр, зона 1 и палети 1бр. зона 3.
    // Когато изтрия първият ред остава само палети 1бр. зона 3 с правилното количество и оставащи бройки за запълване на зоните.
    // Когато обаче изтрия количеството не работи както трябва. Причината е updateStep4Item в  MoveGoodsForm компонента.
    // Тя все още има индекс 1, но след изтриване на компонента реално трябва вече да е с индекс 0.
    // Не знам как да го направя да работи както трябва. Моля да ми помогнеш.
    const updatedForms = moveGoodsForms.filter((_, id) => id !== index)
    setMoveGoodsForms(updatedForms)
    deleteStep4Item(index)
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
          onDeleteHandler={() => onDeleteHandler(index)}
        />
      ))}
      <Alert
        variant="outlined"
        severity={isCompletedMove ? 'success' : isExceedQuantity ? 'error' : 'info'}>
        {alertMessage}
      </Alert>
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
