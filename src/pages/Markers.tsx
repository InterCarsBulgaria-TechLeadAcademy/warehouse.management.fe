import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'
import MarkersTable from '@/components/features/MarkersTable'

export default function Markers() {
  const { t: translate } = useTranslation()

  const handleClickOpen = () => {
  }

  return (
    <>
      <SkeletonPage
        header={translate('markers.title')}
        description={translate('markers.description')}
        buttonText={translate('markers.labels.newMarker')}
        buttonClickHandler={handleClickOpen}
        table={<MarkersTable />}
      />
    </>
  )
}
