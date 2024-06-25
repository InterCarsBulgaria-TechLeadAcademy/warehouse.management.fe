import { useTranslation } from 'react-i18next'

export default function useTranslateGoodTypesOptionsToBulgarian(goodType: string[]): string[] {
  const { t: translate } = useTranslation()
  const translateGoodTypes: any = goodType.map((type) => {
    switch (type) {
      case 'pallets':
        return translate('newDelivery.goodType.pallets')
      case 'packages':
        return translate('newDelivery.goodType.packages')
      case 'pieces':
        return translate('newDelivery.goodType.pieces')
    }
  })
  return translateGoodTypes
}
