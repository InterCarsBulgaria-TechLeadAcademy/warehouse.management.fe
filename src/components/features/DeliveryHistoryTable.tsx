import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'react-i18next'
import { Change } from '@/services/model'
import useGetDeliveryHistory from '@/hooks/services/deliveries/useGetDeliveryHistory'
import dateHelpers from '@/utils/dateHelpers'

interface DeliveryHistoryTableProps {
  deliveryId: number
}

export default function DeliveryHistoryTable({ deliveryId }: DeliveryHistoryTableProps) {
  const { t: translate } = useTranslation()

  const deliveriesHistory = useGetDeliveryHistory(deliveryId)

  console.log(deliveriesHistory)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              {translate('deliveries.table.actions.details.step5.table.table-head.changed')}
            </TableCell>
            <TableCell align="left">
              {' '}
              {translate('deliveries.table.actions.details.step5.table.table-head.typeChange')}
            </TableCell>
            <TableCell align="left">
              {translate('deliveries.table.actions.details.step5.table.table-head.from')}
            </TableCell>
            <TableCell align="left">
              {translate('deliveries.table.actions.details.step5.table.table-head.to')}
            </TableCell>
            <TableCell align="left">
              {translate('deliveries.table.actions.details.step5.table.table-head.dataChange')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveriesHistory.changes?.map((changes: Change, index: number) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {changes.propertyName!}
              </TableCell>
              <TableCell align="left">{changes.type}</TableCell>
              <TableCell align="left">{dateHelpers(changes.to!)}</TableCell>
              <TableCell align="left">{dateHelpers(changes.from!)}</TableCell>
              <TableCell align="left"> {dateHelpers(changes.changeDate!)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
