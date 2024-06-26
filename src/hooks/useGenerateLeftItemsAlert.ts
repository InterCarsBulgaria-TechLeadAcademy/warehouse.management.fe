import { MoveGood } from '@/interfaces/moveGood'
import { Step3Items } from '@/interfaces/step3Items'
import calculateCurrentItems from '@/utils/calculateCurrentItems'
import calculateLeftItems from '@/utils/calculateLeftItems'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function useGenerateLeftItemsAlert(
  step3Items: Step3Items,
  step4Items: MoveGood[],
  setAlertMessage: Dispatch<SetStateAction<string[]>>,
  setIsExceedQuantity: Dispatch<SetStateAction<boolean>>,
  setIsCompletedMove: Dispatch<SetStateAction<boolean>>
) {
  const { t: translate } = useTranslation()

  useEffect(() => {
    const currentItems = calculateCurrentItems(step4Items)
    const leftItems = calculateLeftItems(step3Items, currentItems)

    if (leftItems.pallets === 0 && leftItems.packages === 0 && leftItems.pieces === 0) {
      setIsExceedQuantity(false)
      setIsCompletedMove(true)
      setAlertMessage([translate('newDelivery.alertMessages.completedMove')])
    } else if (leftItems.pallets < 0 || leftItems.packages < 0 || leftItems.pieces < 0) {
      const newAlertMessage = []
      for (const [key, value] of Object.entries(leftItems)) {
        if (value < 0) {
          setIsCompletedMove(false)
          setIsExceedQuantity(true)
          switch (key) {
            case 'pallets':
              newAlertMessage.push(
                translate('newDelivery.alertMessages.exceedPallets', {
                  quantity: currentItems.pallets - step3Items.pallets
                })
              )
              break
            case 'packages':
              newAlertMessage.push(
                translate('newDelivery.alertMessages.exceedPackages', {
                  quantity: currentItems.packages - step3Items.packages
                })
              )
              break
            case 'pieces':
              newAlertMessage.push(
                translate('newDelivery.alertMessages.exceedPieces', {
                  quantity: currentItems.pieces - step3Items.pieces
                })
              )
              break
          }
          setAlertMessage(newAlertMessage)
        }
      }
    } else {
      const newAlertMessage = []
      for (const [key, value] of Object.entries(leftItems)) {
        if (value > 0) {
          setIsCompletedMove(false)
          setIsExceedQuantity(false)
          switch (key) {
            case 'pallets':
              newAlertMessage.push(
                translate('newDelivery.alertMessages.leftPallets', {
                  quantity: leftItems.pallets
                })
              )
              break
            case 'packages':
              newAlertMessage.push(
                translate('newDelivery.alertMessages.leftPackages', {
                  quantity: leftItems.packages
                })
              )
              break
            case 'pieces':
              newAlertMessage.push(
                translate('newDelivery.alertMessages.leftPieces', {
                  quantity: leftItems.pieces
                })
              )
              break
          }
          setAlertMessage(newAlertMessage)
        }
      }
    }
  }, [step4Items])
}
