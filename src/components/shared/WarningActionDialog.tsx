import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface WarningActionDialogProps {
  open: boolean
  title: string
  content?: string
  discardText: string
  confirmText?: string
  onCloseDialog: () => void
  onDiscardClick: () => void
  onConfirmClick?: () => void
}

export default function WarningActionDialog({
  open,
  title,
  content,
  discardText,
  confirmText,
  onCloseDialog,
  onDiscardClick,
  onConfirmClick
}: WarningActionDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDiscardClick}>{discardText}</Button>
        <Button onClick={onConfirmClick}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  )
}
