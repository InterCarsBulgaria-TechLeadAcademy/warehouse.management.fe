import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { Good } from '@/hooks/useSetGoodsType.ts'
import ChipsList from './ChipsList'
import NewDeliveryStep5Table from './forms/newDeliveryForm/NewDeliveryStep5Table'
import useGetDelivery from '@/hooks/services/deliveries/useGetDelivery'
import { useEffect } from 'react'

export default function DeliveryDetails(deliveryId: number) {
  const { t: translate } = useTranslation()
  const { mutate, data, isError } = useGetDelivery()

  //TODO: Check if it work. Dot 5 is not whiting. View design.
  useEffect(() => {
    mutate({ id: deliveryId })
  }, [deliveryId, mutate])

  console.log(data)

  if (isError) {
    //TODO: to redirect to common error page
    return <Typography>Error</Typography>
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['1']} />
          <Typography variant="h6">{translate('newDelivery.steps.deliveryDetails')} №</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography>{translate('newDelivery.labels.step1.systemNumber')}</Typography>
            <Typography>{data.systemNumber}</Typography>
          </Box>
          <Box>
            <Typography>{translate('newDelivery.labels.step1.receptionNumber')}</Typography>
            <Typography>{data.receptionNumber}</Typography>
          </Box>
          <Box>
            <Typography>{translate('newDelivery.labels.step1.cmr')}</Typography>
            <Typography>{data.cmr}</Typography>
          </Box>
          <Box>
            <Typography>{translate('newDelivery.labels.step1.markers')}</Typography>
            <ChipsList items={data.markers} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['2']} />
          <Typography variant="h6">{translate('newDelivery.steps.truckDetails')}</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography>{translate('newDelivery.labels.step2.vendorName')}</Typography>
            <Typography>{data.vendorName}</Typography>
          </Box>
          <Box>
            <Typography>{translate('newDelivery.labels.step2.vendorId')}</Typography>
            <Typography>{data?.vendorId}</Typography>
          </Box>
          <Box>
            <Typography>{translate('newDelivery.labels.step2.truckNumber')}</Typography>
            <Typography>{data.truckNumber}</Typography>
          </Box>
          <Box>
            <Typography>{translate('newDelivery.labels.step2.deliveryDate')}</Typography>
            <Typography>{dayjs(data.deliveryDate).format('DD.MM.YYYY')}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['3']} />
          <Typography variant="h6">{translate('newDelivery.steps.goodDetails')}</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          {data.goods.map((good: Good, index: number) => {
            return (
              <Box key={index}>
                <Typography>{translate(`newDelivery.goodType.${good.goodTypeStep3}`)}</Typography>
                <Typography>{good.goodQuantityStep3}</Typography>
              </Box>
            )
          })}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['4']} />
          <Typography variant="h6">{translate('newDelivery.steps.goodRelocate')}</Typography>
        </Box>

        <Box>
          <NewDeliveryStep5Table />
        </Box>
      </Box>
    </Box>
  )
}
