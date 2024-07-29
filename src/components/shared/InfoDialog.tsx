import { Box, Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface InfoDialogProps {
  open: boolean
  title?: string
  content?: string | React.ReactElement
  discardText: string
  confirmText?: string
  onCloseDialog: () => void
  onDiscardClick: () => void
  onConfirmClick?: () => void
}

export default function InfoDialog({
  open,
  title,
  content,
  discardText,
  confirmText,
  onCloseDialog,
  onDiscardClick,
  onConfirmClick
}: InfoDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Box id="alert-dialog-description">{content}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDiscardClick}>{discardText}</Button>
        <Button onClick={onConfirmClick}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  )
}
