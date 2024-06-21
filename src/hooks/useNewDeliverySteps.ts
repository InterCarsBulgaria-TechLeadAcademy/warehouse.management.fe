import { useTranslation } from 'react-i18next'

export default function useNewDeliverySteps(): string[] {
  const { t: translate } = useTranslation()
  const steps = [
    translate('newDelivery.steps.deliveryDetails'),
    translate('newDelivery.steps.truckDetails'),
    translate('newDelivery.steps.goodDetails'),
    translate('newDelivery.steps.goodRelocate'),
    translate('newDelivery.steps.reviewDelivery')
  ]

  return steps
}
