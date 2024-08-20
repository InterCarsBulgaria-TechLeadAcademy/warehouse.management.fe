import { Box, Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface ConfirmDialogProps {
  open: boolean
  title?: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  content?: string | React.ReactElement
  discardText: string
  confirmText?: string
  onCloseDialog: () => void
  onDiscardClick: () => void
  onConfirmClick?: () => void
}

export default function ConfirmDialog({
  open,
  title,
  maxWidth,
  content,
  discardText,
  confirmText,
  onCloseDialog,
  onDiscardClick,
  onConfirmClick
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-title"
      maxWidth={maxWidth || 'sm'}
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
