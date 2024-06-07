import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'

export default function Zones() {
  const { t: translate } = useTranslation()


  return (
    <>
      <SkeletonPage
        header={translate('markers.title')}
        description={translate('markers.description')}
        buttonText={translate('markers.labels.newMarker')}
      />
    </>
  )
}
