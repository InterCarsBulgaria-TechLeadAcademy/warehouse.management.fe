export interface WarningActionDialogProps {
  open: boolean
  title: string
  content?: string
  discardText: string
  confirmText?: string
  onCloseDialog: () => void
  onDiscardClick: () => void
  onConfirmClick?: () => void
}
