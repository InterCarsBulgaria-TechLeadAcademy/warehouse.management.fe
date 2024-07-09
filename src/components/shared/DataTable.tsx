import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Box, FormControlLabel, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Column } from '@/interfaces/Column'

interface DataTableProps<T> {
  columnsData: Column<T>[]
  rowData: T[]
  children: React.ReactNode
  page: number
  rowsPerPage: number
  onPageChange: (newPage: number) => void
  onRowsPerPageChange: (newRowsPerPage: number) => void
}

export default function DataTable<T>({
  columnsData,
  rowData,
  children,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}: DataTableProps<T>) {
  const { t: translate } = useTranslation()
  const [dense, setDense] = React.useState(false)

  const columns: readonly Column<Record<any, any>>[] = columnsData

  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(+event.target.value)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '0.5em' }}>
        <Box
          component="div"
          sx={{ display: 'flex', gap: '2em', padding: '0.5em 0', alignItems: 'center' }}>
          {children}
        </Box>

        <TableContainer sx={{ maxHeight: '60vh' }}>
          <Table stickyHeader aria-label="sticky table" size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                {columnsData.map((column: Column<T>) => (
                  <TableCell
                    key={column.key.toString()}
                    align={column.align}
                    sx={{ minWidth: column.minWidth }}>
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  return (
                    <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => {
                        const value = row[column.key]
                        return (
                          <TableCell
                            key={column.key}
                            align={column.align}
                            sx={column.key === 'actions' ? { width: 50, paddingRight: '2em' } : {}}>
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          //da promenq count da ne e tova
          count={rowData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label={translate('table.densePadding')}
        />
      </Box>
    </Box>
  )
}

// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import DialogTitle from '@mui/material/DialogTitle'
// import Box from '@mui/material/Box'
// import { useForm, SubmitHandler, UseFormReturn, FieldValues } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as React from 'react'
// import * as yup from 'yup'
// import HorizontalStepper from '../features/Stepper'
// import { useTranslation } from 'react-i18next'

// interface FormDialogProps<T extends FieldValues> {
//   open: boolean
//   title: string
//   discardText: string
//   confirmText: string
//   onCloseDialog: () => void
//   handleBack?: () => void
//   schema: yup.ObjectSchema<any> | undefined
//   onSubmit: SubmitHandler<T>
//   renderForm: (methods: UseFormReturn<T>) => React.ReactNode
//   steps?: string[]
//   currentStep?: number
//   isCompletedMove?: boolean
// }

// export default function FormDialog<T extends FieldValues>({
//   open,
//   title,
//   discardText,
//   confirmText,
//   onCloseDialog,
//   handleBack,
//   schema,
//   onSubmit,
//   renderForm,
//   steps,
//   currentStep,
//   isCompletedMove
// }: FormDialogProps<T>) {
//   const { t: translate } = useTranslation()
//   const { control, handleSubmit, formState, reset } = useForm<T>({
//     resolver: schema ? yupResolver(schema) : undefined
//   })

//   const handleClose = () => {
//     reset()
//     onCloseDialog()
//   }

//   const handleFormSubmit: SubmitHandler<T> = (data, event) => {
//     onSubmit(data, event)
//     reset()
//     onCloseDialog()
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description">
//       <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
//         {title}
//       </DialogTitle>

//       <Box sx={{ margin: '2em', minWidth: '450px' }}>
//         {steps && currentStep && <HorizontalStepper currentStep={currentStep} steps={steps} />}
//         <Box
//           component="form"
//           onSubmit={currentStep ? handleSubmit(onSubmit) : handleSubmit(handleFormSubmit)}
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '2em'
//           }}>
//           {renderForm({ control, handleSubmit, formState, reset } as UseFormReturn<T>)}

//           <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
//             <Button
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               onClick={currentStep ? (currentStep === 1 ? handleClose : handleBack) : handleClose}>
//               {currentStep === 1 ? translate('newDelivery.labels.exit') : discardText}
//             </Button>

//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={
//                 currentStep === 4 ? !isCompletedMove : Object.keys(formState.errors).length > 0
//               }>
//               {currentStep === steps?.length
//                 ? translate('newDelivery.labels.step5.createNewDelivery')
//                 : confirmText}
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Dialog>
//   )
// }
