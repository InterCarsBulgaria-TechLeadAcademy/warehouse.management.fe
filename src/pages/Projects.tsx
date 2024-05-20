import { useSuspenseQuery } from '@tanstack/react-query'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getSwaggerPetstore } from '@/services/generated-api.ts'

export default function Projects() {
  const { t: translate } = useTranslation()

  const { data } = useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: () => getSwaggerPetstore().getPetById(1)
  })

  return (
    <>
      <Typography variant="h3">{translate('projects.title')}</Typography>
      <p>{data.name}</p>
    </>
  )
}
