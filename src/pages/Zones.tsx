import SkeletonPage from '@/components/features/SkeletonPage'
import ZonesTable from '@/components/features/ZonesTable'
import { useTranslation } from 'react-i18next'

export default function Zones() {
  const { t: translate } = useTranslation()


  return (
    <>
      <SkeletonPage
        header={translate('zones.title')}
        description={translate('zones.description')}
        table={<ZonesTable />}
      />
    </>
  )
}
