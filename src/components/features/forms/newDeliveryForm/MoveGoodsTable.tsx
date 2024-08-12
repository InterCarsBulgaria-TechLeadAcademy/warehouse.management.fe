import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'react-i18next'
import useGetZones from '@/hooks/services/zones/useGetZones'

interface MoveGoodsTableProps {
  array: any
  goodType: string
  goodQuantity: string
  currentZone: string
}

export default function MoveGoodsTable({
  array,
  goodType,
  goodQuantity,
  currentZone
}: MoveGoodsTableProps) {
  const { t: translate } = useTranslation()
  const zones = useGetZones()

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{translate('newDelivery.labels.step4.goodType')}</TableCell>
            <TableCell align="left">{translate('newDelivery.labels.step4.goodQuantity')}</TableCell>
            <TableCell align="left">{translate('newDelivery.labels.step4.zone')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {array.map((good: any, index: number) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {translate(`newDelivery.goodType.${good[goodType]}`)}
              </TableCell>
              <TableCell align="left">{good[goodQuantity]}</TableCell>
              <TableCell align="left">
                {zones.find((zone) => zone.id! === Number(good[currentZone]))?.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
