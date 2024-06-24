import { useTranslation } from 'react-i18next'

export default function useTranslateGoodTypeToBulgarian(value: string | null): string | null {
  const { t: translate } = useTranslation()
  if (!value) {
    return null
  }

  switch (value) {
    case 'pallets':
      return translate('newDelivery.goodType.pallets')
    case 'packages':
      return translate('newDelivery.goodType.packages')
    case 'pieces':
      return translate('newDelivery.goodType.pieces')
    default:
      return value
  }
}
