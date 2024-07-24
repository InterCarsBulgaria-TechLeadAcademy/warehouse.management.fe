import { useTranslation } from 'react-i18next'

export default function useNewDeliverySteps(): string[] {
  const { t: translate } = useTranslation()
  const steps = [
    translate('deliveries.newDelivery.steps.deliveryDetails'),
    translate('deliveries.newDelivery.steps.truckDetails'),
    translate('deliveries.newDelivery.steps.goodDetails'),
    translate('deliveries.newDelivery.steps.goodRelocate'),
    translate('deliveries.newDelivery.steps.reviewDelivery')
  ]

  return steps
}
