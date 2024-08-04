import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import ChipsList from './ChipsList'
import useGetDelivery from '@/hooks/services/deliveries/useGetDelivery'
import MoveGoodsTable from './forms/newDeliveryForm/MoveGoodsTable'
// import useGetDeliveryHistory from '@/hooks/services/deliveries/useGetDeliveryHistory'
import editEntriesArray from '@/utils/editEntriesArray'

interface DeliveryDetailsProps {
  deliveryId: number
}

export default function DeliveryDetails({ deliveryId }: DeliveryDetailsProps) {
  const { t: translate } = useTranslation()
  const delivery = useGetDelivery(deliveryId)

  //For dot 5
  // const deliveryHistory = useGetDeliveryHistory(deliveryId)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
      <Typography variant="h5">
        {translate('deliveries.table.actions.details.title', { deliveryNumber: deliveryId })}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['1']} />
          <Typography variant="h6">
            {translate('deliveries.table.actions.details.steps.deliveryDetails')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step1.title')}</Typography>
            <Typography>{delivery.systemNumber}</Typography>
          </Box>
          <Box>
            <Typography>
              {translate('deliveries.table.actions.details.step1.receptionNumber')}
            </Typography>
            <Typography>{delivery.receptionNumber}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step1.cmr')}</Typography>
            <Typography>{delivery.cmr}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step1.markers')}</Typography>
            <ChipsList items={delivery.markers!.map((marker) => marker.markerName!)} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['2']} />
          <Typography variant="h6">
            {translate('deliveries.table.actions.details.step2.title')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography>
              {translate('deliveries.table.actions.details.step2.vendorName')}
            </Typography>
            <Typography>{delivery.vendorName}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step2.vendorId')}</Typography>
            <Typography>{delivery.vendorId}</Typography>
          </Box>
          <Box>
            <Typography>
              {translate('deliveries.table.actions.details.step2.truckNumber')}
            </Typography>
            <Typography>{delivery.truckNumber}</Typography>
          </Box>
          <Box>
            <Typography>
              {translate('deliveries.table.actions.details.step2.deliveryDate')}
            </Typography>
            <Typography>{dayjs(delivery.deliveryTime).format('DD.MM.YYYY')}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['3']} />
          <Typography variant="h6">
            {translate('deliveries.table.actions.details.step3.title')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step3.pallets')}</Typography>
            <Typography>{delivery.pallets}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step3.packages')}</Typography>
            <Typography>{delivery.packages}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step3.pieces')}</Typography>
            <Typography>{delivery.pieces}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['4']} />
          <Typography variant="h6">
            {translate('deliveries.table.actions.details.step4.title')}
          </Typography>
        </Box>

        <Box>
          <MoveGoodsTable
            array={editEntriesArray(delivery!.entries!)}
            goodType={'goodType'}
            goodQuantity={'goodQuantity'}
            currentZone={'zone'}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['5']} />
          <Typography variant="h6">
            {translate('deliveries.table.actions.details.step5.title')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography></Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// import { Box, Typography } from '@mui/material'
// import { useTranslation } from 'react-i18next'
// import dayjs from 'dayjs'
// import ChipsList from './ChipsList'
// import useGetDelivery from '@/hooks/services/deliveries/useGetDelivery'
// import { useEffect } from 'react'
// import { FullPageLoader } from '../common/FullPageLoader'
// import MoveGoodsTable from './forms/newDeliveryForm/MoveGoodsTable'
// import useGetDeliveryHistory from '@/hooks/services/deliveries/useGetDeliveryHistory'
// import editEntriesArray from '@/utils/editEntriesArray'

// interface DeliveryDetailsProps {
//   deliveryId: number
// }

// export default function DeliveryDetails({ deliveryId }: DeliveryDetailsProps) {
//   const { t: translate } = useTranslation()
//   // const { mutate: mutateGetDelivery, data: deliveryData } = useGetDelivery()
//   const delivery = useGetDelivery(deliveryId)

//   //Fot dot 5
//   const { mutate: mutateGetDeliveryHistory, data: deliveryHistoryData } = useGetDeliveryHistory()

//   //TODO:  Dot 5 is not whiting. View design.
//   // useEffect(() => {
//   //   mutateGetDelivery({ id: deliveryId })
//   //   mutateGetDeliveryHistory({ id: deliveryId })
//   // }, [deliveryId, mutateGetDelivery, mutateGetDeliveryHistory])

//   if (!deliveryData || !deliveryHistoryData) {
//     return <FullPageLoader />
//   }

//   // console.log(deliveryData)

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
//       <Typography variant="h5">
//         {translate('deliveries.table.actions.details.title', { deliveryNumber: deliveryId })}
//       </Typography>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
//           <ChipsList items={['1']} />
//           <Typography variant="h6">
//             {translate('deliveries.table.actions.details.steps.deliveryDetails')}
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', gap: '2em' }}>
//           <Box>
//             <Typography>{translate('deliveries.table.actions.details.step1.title')}</Typography>
//             <Typography>{deliveryData.systemNumber}</Typography>
//           </Box>
//           <Box>
//             <Typography>
//               {translate('deliveries.table.actions.details.step1.receptionNumber')}
//             </Typography>
//             <Typography>{deliveryData.receptionNumber}</Typography>
//           </Box>
//           <Box>
//             <Typography>{translate('deliveries.table.actions.details.step1.cmr')}</Typography>
//             <Typography>{deliveryData.cmr}</Typography>
//           </Box>
//           <Box>
//             <Typography>{translate('deliveries.table.actions.details.step1.markers')}</Typography>
//             <ChipsList items={deliveryData.markers!.map((marker) => marker.markerName!)} />
//           </Box>
//         </Box>
//       </Box>

//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
//           <ChipsList items={['2']} />
//           <Typography variant="h6">
//             {translate('deliveries.table.actions.details.step2.title')}
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', gap: '2em' }}>
//           <Box>
//             <Typography>
//               {translate('deliveries.table.actions.details.step2.vendorName')}
//             </Typography>
//             <Typography>{deliveryData.vendorName}</Typography>
//           </Box>
//           <Box>
//             <Typography>{translate('deliveries.table.actions.details.step2.vendorId')}</Typography>
//             <Typography>{deliveryData.vendorId}</Typography>
//           </Box>
//           <Box>
//             <Typography>
//               {translate('deliveries.table.actions.details.step2.truckNumber')}
//             </Typography>
//             <Typography>{deliveryData.truckNumber}</Typography>
//           </Box>
//           <Box>
//             <Typography>
//               {translate('deliveries.table.actions.details.step2.deliveryDate')}
//             </Typography>
//             <Typography>{dayjs(deliveryData.deliveryTime).format('DD.MM.YYYY')}</Typography>
//           </Box>
//         </Box>
//       </Box>

//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
//           <ChipsList items={['3']} />
//           <Typography variant="h6">
//             {translate('deliveries.table.actions.details.step3.title')}
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', gap: '2em' }}>
//           <Box>
//             <Typography>{translate('deliveries.table.actions.details.step3.pallets')}</Typography>
//             <Typography>{deliveryData.pallets}</Typography>
//           </Box>
//           <Box>
//             <Typography>{translate('deliveries.table.actions.details.step3.packages')}</Typography>
//             <Typography>{deliveryData.packages}</Typography>
//           </Box>
//           <Box>
//             <Typography>{translate('deliveries.table.actions.details.step3.pieces')}</Typography>
//             <Typography>{deliveryData.pieces}</Typography>
//           </Box>
//         </Box>
//       </Box>

//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
//           <ChipsList items={['4']} />
//           <Typography variant="h6">
//             {translate('deliveries.table.actions.details.step4.title')}
//           </Typography>
//         </Box>

//         <Box>
//           <MoveGoodsTable
//             array={editEntriesArray(deliveryData!.entries!)}
//             goodType={'goodType'}
//             goodQuantity={'goodQuantity'}
//             currentZone={'zone'}
//           />
//         </Box>
//       </Box>

//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
//           <ChipsList items={['5']} />
//           <Typography variant="h6">
//             {translate('deliveries.table.actions.details.step5.title')}
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', gap: '2em' }}>
//           <Box>
//             <Typography></Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   )
// }
