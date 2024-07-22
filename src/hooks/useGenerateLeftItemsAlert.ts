import calculateCurrentItems from '@/utils/calculateCurrentItems'
import calculateLeftItems from '@/utils/calculateLeftItems'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { GoodQuantityStep3, MoveGood } from '@/interfaces/NewDelivery.ts'

export default function useGenerateLeftItemsAlert(
  goodTypeStep3: GoodQuantityStep3,
  goodsInZones: MoveGood[],
  setAlertMessage: Dispatch<SetStateAction<string[]>>,
  setIsExceedQuantity: Dispatch<SetStateAction<boolean>>,
  setIsCompletedMove: Dispatch<SetStateAction<boolean>>
) {
  const { t: translate } = useTranslation()

  useEffect(() => {
    const currentItems = calculateCurrentItems(goodsInZones)
    const leftItems = calculateLeftItems(goodTypeStep3, currentItems)

    if (leftItems.pallets === 0 && leftItems.packages === 0 && leftItems.pieces === 0) {
      setIsExceedQuantity(false)
      setIsCompletedMove(true)
      setAlertMessage([translate('deliveries.newDelivery.alertMessages.completedMove')])
    } else if (leftItems.pallets < 0 || leftItems.packages < 0 || leftItems.pieces < 0) {
      const newAlertMessage = []
      for (const [key, value] of Object.entries(leftItems)) {
        if (Number(value) < 0) {
          setIsCompletedMove(false)
          setIsExceedQuantity(true)
          switch (key) {
            case 'pallets':
              newAlertMessage.push(
                translate('deliveries.newDelivery.alertMessages.exceedPallets', {
                  quantity: currentItems.pallets - goodTypeStep3.pallets
                })
              )
              break
            case 'packages':
              newAlertMessage.push(
                translate('deliveries.newDelivery.alertMessages.exceedPackages', {
                  quantity: currentItems.packages - goodTypeStep3.packages
                })
              )
              break
            case 'pieces':
              newAlertMessage.push(
                translate('deliveries.newDelivery.alertMessages.exceedPieces', {
                  quantity: currentItems.pieces - goodTypeStep3.pieces
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
        if (Number(value) > 0) {
          setIsCompletedMove(false)
          setIsExceedQuantity(false)
          switch (key) {
            case 'pallets':
              newAlertMessage.push(
                translate('deliveries.newDelivery.alertMessages.leftPallets', {
                  quantity: leftItems.pallets
                })
              )
              break
            case 'packages':
              newAlertMessage.push(
                translate('deliveries.newDelivery.alertMessages.leftPackages', {
                  quantity: leftItems.packages
                })
              )
              break
            case 'pieces':
              newAlertMessage.push(
                translate('deliveries.newDelivery.alertMessages.leftPieces', {
                  quantity: leftItems.pieces
                })
              )
              break
          }
          setAlertMessage(newAlertMessage)
        }
      }
    }
  }, [goodsInZones])
}
