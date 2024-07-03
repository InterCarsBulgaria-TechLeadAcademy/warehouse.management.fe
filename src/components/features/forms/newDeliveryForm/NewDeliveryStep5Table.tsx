import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import { useTranslation } from 'react-i18next'

import { MoveGood } from '@/interfaces/NewDelivery.ts'

export default function NewDeliveryStep5Table() {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()

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
          {formsData.goodsInZones.map((good: MoveGood, index: number) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {translate(`newDelivery.goodType.${good.goodTypeStep4}`)}
              </TableCell>
              <TableCell align="left">{good.goodQuantityStep4}</TableCell>
              <TableCell align="left">{translate(`newDelivery.zones.${good.zone}`)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
