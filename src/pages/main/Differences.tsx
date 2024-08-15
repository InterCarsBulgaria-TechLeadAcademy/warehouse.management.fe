import DifferencesTable from '@/components/features/main/DifferencesTable'
import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'

export default function Differences() {
  const { t: translate } = useTranslation()

  return (
    <SkeletonPage
      header={translate('differences.title')}
      description={translate('differences.description')}
      table={<DifferencesTable />}
    />
  )
}
