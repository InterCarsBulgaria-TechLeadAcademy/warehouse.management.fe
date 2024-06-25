import { MoveGood } from '@/interfaces/moveGood'
import { Step3Items } from '@/interfaces/step3Items'
import calculateCurrentItems from '@/utils/calculateCurrentItems'
import calculateLeftItems from '@/utils/calculateLeftItems'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function useGenerateLeftItemsAlert(
  step3Items: Step3Items,
  step4Items: MoveGood[],
  setAlertMessage: Dispatch<SetStateAction<string>>,
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
      setAlertMessage(translate('newDelivery.alertMessages.completedMove'))
    } else if (leftItems.pallets < 0) {
      setIsCompletedMove(false)
      setIsExceedQuantity(true)
      setAlertMessage(
        translate('newDelivery.alertMessages.exceedPallets', {
          quantity: currentItems.pallets - step3Items.pallets
        })
      )
    } else if (leftItems.packages < 0) {
      setIsCompletedMove(false)
      setIsExceedQuantity(true)
      setAlertMessage(
        translate('newDelivery.alertMessages.exceedPackages', {
          quantity: currentItems.packages - step3Items.packages
        })
      )
    } else if (leftItems.pieces < 0) {
      setIsCompletedMove(false)
      setIsExceedQuantity(true)
      setAlertMessage(
        translate('newDelivery.alertMessages.exceedPieces', {
          quantity: currentItems.pieces - step3Items.pieces
        })
      )
    } else {
      setIsCompletedMove(false)
      setIsExceedQuantity(false)

      let palletsMessage =
        leftItems.pallets === 0
          ? ''
          : translate('newDelivery.alertMessages.leftPallets', {
              quantity: leftItems.pallets
            })

      let packagesMessage =
        leftItems.packages === 0
          ? ''
          : palletsMessage === ''
            ? translate('newDelivery.alertMessages.leftPackages', {
                quantity: leftItems.packages
              })
            : translate('newDelivery.alertMessages.leftPackagesWithComma', {
                quantity: leftItems.packages
              })

      let piecesMessage =
        leftItems.pieces === 0
          ? ''
          : palletsMessage === '' && packagesMessage === ''
            ? translate('newDelivery.alertMessages.leftPieces', {
                quantity: leftItems.pieces
              })
            : translate('newDelivery.alertMessages.leftPiecesWithComma', {
                quantity: leftItems.pieces
              })

      setAlertMessage(
        translate('newDelivery.alertMessages.remainingItems', {
          palletsMessage: palletsMessage,
          packagesMessage: packagesMessage,
          piecesMessage: piecesMessage
        })
      )
    }
  }, [step4Items])
}
