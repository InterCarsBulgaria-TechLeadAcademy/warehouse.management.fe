import ZonesContentsTable from '@/components/features/main/ZonesContentTable'
import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'

export default function ZonesContent() {
  const { t: translate } = useTranslation()

  return (
    <SkeletonPage
      header={translate('zonesContent.title')}
      description={translate('zonesContent.description')}
      table={<ZonesContentsTable />}
    />
  )
}
