import { useEffect } from 'react'

export default function useGenerateLeftItemsAlert(
  step3Items: any,
  step4Items: any,
  setIsExceedQuantity: any,
  setAlertMessage: any,
  setIsCompletedMove: any
) {
  useEffect(() => {
    const currentItems = { pallets: 0, packages: 0, pieces: 0 }

    step4Items.map((item: any) => {
      if (item.type === 'pallets') {
        currentItems.pallets += item.quantity
      } else if (item.type === 'packages') {
        currentItems.packages += item.quantity
      } else if (item.type === 'pieces') {
        currentItems.pieces += item.quantity
      }
      return item
    })

    const leftItems = {
      pallets: step3Items.pallets - currentItems.pallets,
      packages: step3Items.packages - currentItems.packages,
      pieces: step3Items.pieces - currentItems.pieces
    }

    if (leftItems.pallets < 0) {
      setIsExceedQuantity(true)
      setAlertMessage(
        `Количеството на палетите е надвишено с ${currentItems.pallets - step3Items.pallets}`
      )
    } else if (leftItems.packages < 0) {
      setIsExceedQuantity(true)
      setAlertMessage(
        `Количеството на пакетите е надвишено с ${currentItems.packages - step3Items.packages}`
      )
    } else if (leftItems.pieces < 0) {
      setIsExceedQuantity(true)
      setAlertMessage(
        `Количеството на бройките е надвишено с ${currentItems.pieces - step3Items.pieces}`
      )
    } else if (leftItems.pallets === 0 && leftItems.packages === 0 && leftItems.pieces === 0) {
      setIsCompletedMove(true)
      setAlertMessage('Всички стоки са разпределени по зони')
    } else {
      setIsCompletedMove(false)
      setIsExceedQuantity(false)

      let palletsMessage = leftItems.pallets === 0 ? '' : `${leftItems.pallets} палети`
      let packagesMessage =
        leftItems.packages === 0
          ? ''
          : palletsMessage === ''
            ? `${leftItems.packages} пакети`
            : `, ${leftItems.packages} пакети`
      let piecesMessage =
        leftItems.pieces === 0
          ? ''
          : palletsMessage === '' && packagesMessage === ''
            ? `${leftItems.pieces} бройки`
            : `, ${leftItems.pieces} бройки`

      setAlertMessage(
        `Остава да поставите ${palletsMessage} ${packagesMessage} ${piecesMessage} в зони`
      )
    }
  }, [step4Items])
}
